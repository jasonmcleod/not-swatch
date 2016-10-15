export default function create() {
    // Create some map data dynamically
    //  Map size is 128x128 tiles
    var data = '';

    for (var y = 0; y < 128; y++) {
        for (var x = 0; x < 128; x++) {
            data += this.rnd.between(50, 55).toString();
            if (x < 127) {
                data += ',';
            }
        }

        if (y < 127) {
            data += "\n";
        }
    }

    //  Add data to the cache
    this.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

    // //  Create our map (the 16x16 is the tile size)
    const map = this.add.tilemap('dynamicMap', 16, 16);

    // //  'tiles' = cache image key, 16x16 = tile size
    map.addTilesetImage('tiles', 'tiles', 16, 16);

    // //  0 is important
    const layer = map.createLayer(0);

    // //  Scroll it
    layer.resizeWorld();

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = this.input.keyboard.createCursorKeys();
}