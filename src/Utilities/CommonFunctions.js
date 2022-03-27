export const getRandomBackgroundColor = () => {
    let colors = ['#7FFFD4', '#FF7F50', '#FFA07A', '#FFB6C1', '#8FBC8F']
    return colors[Math.floor(Math.random() * 4)]
}