using Pescaderia.Models;

namespace Pescaderia.Patterns.Observer
{
    public class OrderSubject
    {
        private readonly List<IOrderObserver> _observers = new();

        public void Attach(IOrderObserver observer)
        {
            _observers.Add(observer);
        }

        public void Detach(IOrderObserver observer)
        {
            _observers.Remove(observer);
        }

        public void Notify(Order order)
        {
            foreach (var observer in _observers)
            {
                observer.Update(order);
            }
        }
    }
}
