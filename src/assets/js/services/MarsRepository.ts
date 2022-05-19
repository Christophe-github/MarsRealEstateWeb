import { MarsAPIQuery } from "../data/MarsAPIQuery";
import { MarsAPIQueryResult } from "../data/MarsAPIQueryResult";
import { MarsProperty } from "../data/MarsProperty";
import InMemoryDatabase from "./InMemoryDatabase";
import LocalDatabase from "./LocalDatabase";



class MarsRepository {


    fetchProperties = async (query: MarsAPIQuery): Promise<MarsAPIQueryResult> => InMemoryDatabase.fetchProperties(query);

    fetchProperty = async (propertyId: string): Promise<MarsProperty | null> => InMemoryDatabase.fetchProperty(propertyId);


    async fetchFavorites(query: MarsAPIQuery): Promise<MarsAPIQueryResult> {
        const favs = LocalDatabase.getFavorites();
        if (favs.size == 0)
            return Promise.resolve(new MarsAPIQueryResult(0,[]));

        //Copying the query to avoid modifying it
        const favoritesQuery = Object.assign({}, query);
        favoritesQuery.subSetIds = [...favs];

        return this.fetchProperties(favoritesQuery);
    }


    addToFavorites = (propertyId: string) => LocalDatabase.addToFavorites(propertyId);

    removeFromFavorites = (propertyId: string) => LocalDatabase.removeFromFavorites(propertyId);

    clearFavorites = () => LocalDatabase.clearFavorites()
}


export default new MarsRepository();