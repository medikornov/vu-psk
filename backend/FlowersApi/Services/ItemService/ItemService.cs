using AutoMapper;
using DataAccessLayer.Entities;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryWrapper;
using FlowersApi.Models.ItemDtos;
using FlowersApi.Wrappers;

namespace FlowersApi.Services.ItemService
{
    public class ItemService : IItemService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<ItemService> _logger;

        public ItemService(IRepositoryWrapper repository, IMapper mapper, ILogger<ItemService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<PagedResponse<IEnumerable<ItemResponseDto>>> GetAllAsync(PaginationFilter filter)
        {
            try
            {
                var items = await _repository.Items.GetAllAsync(filter);

                double totalRecords = await _repository.Items.CountAsync();
                var totalPages = Math.Ceiling(totalRecords / filter.PageSize);

                var itemResponses = _mapper.Map<IList<ItemResponseDto>>(items);

                return new PagedResponse<IEnumerable<ItemResponseDto>>(itemResponses, filter.PageNumber, filter.PageSize, (int)totalPages, (int)totalRecords);
            }
            catch (Exception ex)
            {
                _logger.LogError(20001, ex, "ItemService GetAllAsync caused an exception");
                throw;
            }
        }

        public async Task<ItemResponseDto> GetByIdAsync(Guid itemId)
        {
            try
            {
                var item = await GetItemAsync(itemId);
                return _mapper.Map<ItemResponseDto>(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(20002, ex, "ItemService GetByIdAsync caused an exception");
                throw;
            }
        }

        public async Task<ItemResponseDto> CreateAsync(CreateItemDto dto)
        {
            try
            {
                var item = _mapper.Map<Item>(dto);

                // Add new guid
                item.ItemId = Guid.NewGuid();

                using(var memoryStream = new MemoryStream())
                {
                    await dto.Photo.CopyToAsync(memoryStream);

                    // Upload the file if less than 2 MB
                    if (memoryStream.Length < 2097152)
                    {
                        item.PhotoContent = memoryStream.ToArray();
                        item.PhotoContentType = dto.Photo.ContentType;
                        item.PhotoName = dto.Photo.FileName;
                    }
                    else
                    {
                        throw new ApplicationException("The file is too large. Max size is 2 MB.");
                    }
                }

                // Save item
                _repository.Items.Add(item);
                await _repository.SaveAsync();

                return _mapper.Map<ItemResponseDto>(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(20003, ex, "ItemService CreateAsync caused an exception");
                throw;
            }
        }

        public async Task<ItemResponseDto> UpdateAsync(Guid itemId, UpdateItemDto dto)
        {
            try
            {
                var item = await GetItemAsync(itemId);

                if (dto.Photo != null && dto.Photo.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await dto.Photo.CopyToAsync(memoryStream);

                        // Upload the file if less than 2 MB
                        if (memoryStream.Length < 2097152)
                        {
                            item.PhotoContent = memoryStream.ToArray();
                            item.PhotoContentType = dto.Photo.ContentType;
                            item.PhotoName = dto.Photo.FileName;
                        }
                        else
                        {
                            throw new ApplicationException("The file is too large. Max size is 2 MB.");
                        }
                    }
                }

                // Copy dto to item and save
                _mapper.Map(dto, item);
                _repository.Items.Update(item);
                await _repository.SaveAsync();

                return _mapper.Map<ItemResponseDto>(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(20004, ex, "ItemService UpdateAsync caused an exception");
                throw;
            }
        }

        public async Task DeleteAsync(Guid itemId)
        {
            try
            {
                var item = await GetItemAsync(itemId);

                _repository.Items.Delete(item);
                await _repository.SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(20005, ex, "ItemService DeleteAsync caused an exception");
                throw;
            }
        }

        // Helper method
        private async Task<Item> GetItemAsync(Guid itemId)
        {
            var item = await _repository.Items.FindAsync(itemId);

            if (item == null)
            {
                throw new KeyNotFoundException("Item not found");
            }

            return item;
        }
    }
}
