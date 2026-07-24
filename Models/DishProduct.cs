namespace Pescaderia.Models
{
    public class DishProduct : Product
    {
        public DishProduct(string id, string name, string description, decimal price, string weight, 
                           bool available, bool isOffer, 
                           decimal? offerPrice, List<string> ingredients, string preparationTime, string origin)
            : base(id, name, description, price, "Platillos", weight, available, isOffer, 
                   offerPrice, ingredients, preparationTime, origin)
        {
        }

        public override string GetProductSummary()
        {
            return $"🍽️ [Platillo] {Name} - Listo en {PreparationTime}";
        }
    }
}
