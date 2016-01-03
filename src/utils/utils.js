/**
 * Created by melanie on 03/01/16.
 */

export default {

    /**
     * Permet de mélanger les éléments d'un tableau
     * @param array le tableau à mélanger
     * @returns {array}
     */
    shuffle(array) {
        for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    }
}