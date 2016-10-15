export default function update() {
    if (this.cursors.left.isDown) {
        this.camera.x-=3;
    } else if (this.cursors.right.isDown) {
        this.camera.x+=3;
    }

    if (this.cursors.up.isDown) {
        this.camera.y-=3;
    } else if (this.cursors.down.isDown) {
        this.camera.y+=3;
    }
}