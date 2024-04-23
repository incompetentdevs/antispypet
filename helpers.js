const colors = {
    success: "#22c55e",
    error: "#ef4444",
    blend: "#2f3136",
    random: [
        "000000",
        "#1ABC9C",
        "#11806A",
        "#57F287",
        "#1F8B4C",
        "#3498DB",
        "#206694",
        "#9B59B6",
        "#71368A",
        "#E91E63",
        "#AD1457",
        "#F1C40F",
        "#C27C0E",
        "#E67E22",
        "#A84300",
        "#ED4245",
        "#992D22",
        "#95A5A6",
        "#979C9F",
        "#7F8C8D",
        "#BCC0C0",
        "#34495E",
        "#2C3E50",
        "#FFFF00",
    ],
};

global.getRandomColor = function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.random.length);
    return colors.random[randomIndex];
}

module.exports = colors;