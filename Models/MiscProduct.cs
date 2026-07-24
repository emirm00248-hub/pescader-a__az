namespace Pescaderia.Models
{
    public class MiscProduct : Product
    {
        public MiscProduct(string id, string name, string description, decimal price, string category, string weight, 
                           bool available, bool isOffer, 
                           decimal? offerPrice, List<string> ingredients, string preparationTime, string origin)
            : base(id, name, description, price, category, weight, available, isOffer, 
                   offerPrice, ingredients, preparationTime, origin)
        {
        }

        public override string GetProductSummary()
        {
            return $"📦 [{Category}] {Name} - {Weight}";
        }
    }
}
