/* Page model
 * id: Unique identifier
 * title: display name
 * url: link attribute
 * icon: FontAwesome icon name (do not include "icon-")
 */
function Page(id, title, url, icon) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.icon = icon;
}

// Create an array of pages to show in navigation element
module.exports = [
    new Page("index", "/", "/", "home"),
    new Page("stats", "/stats", "stats", "bar-chart"),
    new Page("screens", "/screens", "screens", "desktop"),
    new Page("hosted", "/hosted", "hosted", "folder-close-alt"),
    new Page("hardware", "/hardware", "hardware", "cog"),
    new Page("propaganda", "/propaganda", "propaganda", "linux"),
    new Page("library", "/library", "library", "music")
];
