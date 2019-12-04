// Add String prototype method to split string into
// an array of substrings of a given length, along with any remainder
// https://gist.github.com/cliffhall/46275ed4d8270b5330e6b58e00ea5e9c
if (!String.prototype.cordwood) {
    String.prototype.cordwood = function(cordlen) {
        if (cordlen === undefined || cordlen > this.length) {
            cordlen = this.length;
        }
        var yardstick = new RegExp(`.{${cordlen}}`, 'g');
        var pieces = this.match(yardstick);
        var accumulated = (pieces.length * cordlen);
        var modulo = this.length % accumulated;
        if (modulo) pieces.push(this.slice(accumulated));
        return pieces;
    };
}