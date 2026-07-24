namespace Pescaderia.Models
{
    public class SeafoodProduct : Product
    {
        public SeafoodProduct(string id, string name, string description, decimal price, string weight, 
                           bool available, bool isOffer, 
                           decimal? offerPrice, List<string> ingredients, string preparationTime, string origin)
            : base(id, name, description, price, "Mariscos Frescos", weight, available, isOffer, 
                   offerPrice, ingredients, preparationTime, origin)
        {
        }

        public override string GetProductSummary()
        {
            return $"🐟 [Marisco Crudo] {Name} - Fresco desde {Origin}";
        }
    }
}
