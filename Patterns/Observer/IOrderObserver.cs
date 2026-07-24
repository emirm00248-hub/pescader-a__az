using Pescaderia.Models;

namespace Pescaderia.Patterns.Observer
{
    public interface IOrderObserver
    {
        void Update(Order order);
    }
}
