using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlowersApi.Migrations
{
    /// <inheritdoc />
    public partial class Modifyitem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Items",
                newName: "PhotoName");

            migrationBuilder.AddColumn<byte[]>(
                name: "PhotoContent",
                table: "Items",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoContentType",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoContent",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "PhotoContentType",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "PhotoName",
                table: "Items",
                newName: "PhotoUrl");
        }
    }
}
