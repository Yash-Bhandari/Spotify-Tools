import Sentencer from 'sentencer';

//Capitalizes the first letter of a word
const capitalizeFirst = word => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Returns a random playlist name (string).
 */
export const makePlaylistName = () => {
    let adj = Sentencer.make("{{ adjective }}");
    let noun = Sentencer.make("{{ noun }}");
    return capitalizeFirst(adj) + ' ' + capitalizeFirst(noun);
}
