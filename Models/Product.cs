namespace Pescaderia.Models
{
    public abstract class Product
    {
        public string Id { get; protected set; }
        public string Name { get; protected set; }
        public string Description { get; protected set; }
        public decimal Price { get; protected set; }
        public string Category { get; protected set; }
        public string Weight { get; protected set; }
        public bool Available { get; protected set; }
        public bool IsOffer { get; protected set; }
        public decimal? OfferPrice { get; protected set; }
        public List<string> Ingredients { get; protected set; }
        public string PreparationTime { get; protected set; }
        public string Origin { get; protected set; }

        protected Product(string id, string name, string description, decimal price, string category, string weight, 
                          bool available, bool isOffer, 
                          decimal? offerPrice, List<string> ingredients, string preparationTime, string origin)
        {
            Id = id;
            Name = name;
            Description = description;
            Price = price;
            Category = category;
            Weight = weight;
            Available = available;
            IsOffer = isOffer;
            OfferPrice = offerPrice;
            Ingredients = ingredients ?? new List<string>();
            PreparationTime = preparationTime;
            Origin = origin;
        }

        public virtual decimal GetCurrentPrice()
        {
            return IsOffer && OfferPrice.HasValue ? OfferPrice.Value : Price;
        }

        public abstract string GetProductSummary();
    }
}
