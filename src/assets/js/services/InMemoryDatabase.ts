import { MarsAPIQuery } from "../data/MarsAPIQuery";
import { MarsAPIQueryResult } from "../data/MarsAPIQueryResult";
import { MarsProperty } from "../data/MarsProperty";
import { delay } from "../utils";

const properties = Array.from(Array(1_000), (_, i) => {
    const id = (140000 + i).toString();
    const type = [MarsProperty.Type.Buy, MarsProperty.Type.Rent][Math.floor(Math.random() * 2)];
    const imgSrcUrl = require(`@/assets/img/photos/mars_landscape_${i % 6 + 1}.jpg`);

    let description = "Ut quasi est at deserunt. Quas mollitia doloribus aut. ";
    if (i % 2 == 0 || i % 3 == 0) { description += "Deleniti inventore quo iure in."; }

    let price = Math.floor(100_000 + Math.random() * 300_000);
    if (type === MarsProperty.Type.Rent) price = Math.floor(price / 10);

    const surfaceArea = Math.floor(10 + Math.random() * 990);

    const latitude = Math.floor(Math.random() * 360 - 180 );
    const longitude = Math.floor(Math.random() * 360);

    return new MarsProperty(id, imgSrcUrl, type, price, description, surfaceArea, latitude, longitude);
})




const itemsPerPage = 10;


class InMemoryDatabase {

    static async fetchProperties(query: MarsAPIQuery): Promise<MarsAPIQueryResult> {
        await delay(200)

 
        const matching = properties
            .filter((prop) => {

                const subSetIdsMatch = query.subSetIds.length == 0 || query.subSetIds.includes(prop.id);
                const filterMatch = query.filter.length == 0 || prop.id.indexOf(query.filter) != -1;
                const typeMatch = query.type === MarsAPIQuery.Type.All ? true : prop.type === query.type;

                return subSetIdsMatch && filterMatch && typeMatch;

            })
            .sort((previous, next) => {
                if (query.sortBy === MarsAPIQuery.SortBy.PriceAsc )
                    return previous.price - next.price;
                else if (query.sortBy === MarsAPIQuery.SortBy.PriceDesc)
                    return next.price - previous.price;
                else
                    return previous.id >= next.id ? 1 : -1;
            });



        let totalPageCount = Math.floor(matching.length / itemsPerPage)
        if (matching.length % itemsPerPage) totalPageCount++;

        const toDrop = (query.page - 1) * itemsPerPage;
        const toKeep = toDrop + itemsPerPage;


        return new MarsAPIQueryResult(
            totalPageCount,
            matching.slice(toDrop, toKeep)
        );
    }

    static async fetchPropertyArray(propertiesId: string[]): Promise<(MarsProperty | null)[]> {
        const result: Promise<MarsProperty | null>[] = [];
        for (const id of propertiesId) {
            result.push(InMemoryDatabase.fetchProperty(id));
        }

        return Promise.all(result);
    }

    static async fetchProperty(propertyId: string): Promise<MarsProperty | null> {
        await delay(200)
        return Promise.resolve(properties.find((prop) => prop.id === propertyId) || null);
    }
}

export default InMemoryDatabase;