// Café é o combustível para programação!! -> cafe-e-o-combustivel-para-programacao

export function slugify(string: string) {
    return string && string
        .toString() // Cast to string (optional)
        .normalize('NFKD') // Returns the Unicode Normalization Form of a given string.
        .toLowerCase() // Convert the string to lowercase letters
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}