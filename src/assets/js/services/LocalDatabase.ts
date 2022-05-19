class LocalDatabase {

    static getFavorites(): Set<string> {
        return new Set(JSON.parse(localStorage.getItem('favorites') ?? "[]"));
    }


    private static setFavorites(newFavorites: Iterable<string>) {
        localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
    }


    static addToFavorites(propertyId: string) {
        LocalDatabase.setFavorites(LocalDatabase.getFavorites().add(propertyId));
    }

    static removeFromFavorites(propertyId: string) {
        const favs = LocalDatabase.getFavorites();
        favs.delete(propertyId);
        LocalDatabase.setFavorites(favs);
    }

    static clearFavorites() {
        LocalDatabase.setFavorites([]);
    }
}

export default LocalDatabase;