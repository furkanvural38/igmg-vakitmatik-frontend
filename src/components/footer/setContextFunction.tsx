// getDailyContent.ts
const setContextFunction = () => {
    const date = new Date();
    const day = date.getDate(); // Gibt den aktuellen Tag des Monats zurück

    const texts = [
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."+
        "At vero eos et accusam et justo duo dolores et ea rebum."+
        "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."+
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." +
        "At vero eos et accusam et justo duo dolores et ea rebum."
    ];

    const images = [
        "../../../ressources/dua-image.png"
    ];

    const text = texts[day % texts.length];
    const image = images[day % images.length];

    return { text, image };
};

export default setContextFunction;
