using Pescaderia.Models;

namespace Pescaderia.Patterns.Factory
{
    public static class ProductFactory
    {
        public static Product CreateProduct(string id, string name, string description, decimal price, string category, string weight, 
                          bool available, bool availableForPickup, bool availableForDelivery, bool isOffer, 
                          decimal? offerPrice, List<string> ingredients, string preparationTime, string origin)
        {
            if (category == "Platillos")
            {
                return new DishProduct(id, name, description, price, category, weight, available, availableForPickup, availableForDelivery, isOffer, offerPrice, ingredients, preparationTime, origin);
            }
            else if (category == "Mariscos Frescos")
            {
                return new SeafoodProduct(id, name, description, price, category, weight, available, availableForPickup, availableForDelivery, isOffer, offerPrice, ingredients, preparationTime, origin);
            }
            else
            {
                return new MiscProduct(id, name, description, price, category, weight, available, availableForPickup, availableForDelivery, isOffer, offerPrice, ingredients, preparationTime, origin);
            }
        }
    }
}
