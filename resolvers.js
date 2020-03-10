// Resolvers define the technique for fetching the types defined in the schema.

module.exports = {
    Query: {
        offers: async (_source, _args, { dataSources }) => {
            const offers = await dataSources.promobitAPI.getOffers();
            return offers.map((offer) => {
                return {
                    id: offer.offerId,
                    title: offer.offerTitle,
                    image: offer.offerPhoto,
                    storeDomain: offer.offerFrom,
                    userId: offer.publisherId,
                };
            });
        },
    },
    Offers: {
        user: async (offer, _, { dataSources }) => {
            const user = await dataSources.promobitAPI.getUser(offer.userId);
            return {
                id: user.id,
                name: user.username,
            };
        },
        store: async (offer, _, { dataSources }) => {
            const store = await dataSources.promobitAPI.getStore(offer.storeDomain);
            return {
                id: store.id,
                title: store.pageTitle,
                domain: store.pageFrom,
                image: store.pageImage
            };
        },
    },
};