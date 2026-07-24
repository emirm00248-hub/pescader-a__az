using System.Collections.Concurrent;
using Pescaderia.Models;
using Pescaderia.Patterns.Factory;

namespace Pescaderia.Patterns.Singleton
{
    public sealed class InMemoryDatabase
    {
        private static InMemoryDatabase? _instance = null;
        private static readonly object _padlock = new object();

        public List<Product> Products { get; private set; }
        public ConcurrentDictionary<string, Order> Orders { get; private set; }

        private InMemoryDatabase()
        {
            Products = new List<Product>();
            Orders = new ConcurrentDictionary<string, Order>();
            SeedData();
        }

        public static InMemoryDatabase Instance
        {
            get
            {
                lock (_padlock)
                {
                    if (_instance == null)
                    {
                        _instance = new InMemoryDatabase();
                    }
                    return _instance;
                }
            }
        }

        ~InMemoryDatabase()
        {
            Console.WriteLine("[InMemoryDatabase Destructor] Liberando recursos de la base de datos en memoria...");
        }

        private void SeedData()
        {
            Products.Add(ProductFactory.CreateProduct("1", "Pescado Empanizado (Orden)", "Incluye pescado empanizado acompañado de arroz, frijol, tortillas y guarnición.", 120m, "Platillos", "Orden", true, true, true, true, 120m, new List<string> { "Filete de pescado", "Pan molido", "Especias", "Arroz", "Frijoles", "Tortillas" }, "15 min", "Mérida, Yucatán"));
            Products.Add(ProductFactory.CreateProduct("2", "Pescado Empanizado (Media Orden)", "Incluye arroz, frijol, tortillas y guarnición. Una porción menor de pescado.", 90m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Filete de pescado", "Pan molido", "Arroz", "Frijoles", "Tortillas" }, "12 min", "Mérida, Yucatán"));
            Products.Add(ProductFactory.CreateProduct("3", "Camarón Empanizado (Orden)", "Incluye camarones empanizados de primera, arroz, frijol, tortillas y guarnición.", 170m, "Platillos", "Orden", true, true, true, true, 170m, new List<string> { "Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas", "Ensalada" }, "18 min", "Campeche, México"));
            Products.Add(ProductFactory.CreateProduct("4", "Camarón Empanizado (Media Orden)", "Incluye arroz, frijol, tortillas y guarnición. Porción menor de camarones.", 120m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas" }, "15 min", "Campeche, México"));
            Products.Add(ProductFactory.CreateProduct("5", "Cóctel de Camarón (Copa)", "Cóctel preparado de camarón fresco con salsa especial de la casa, cilantro, cebolla y aguacate.", 160m, "Platillos", "Copa", true, true, true, false, null, new List<string> { "Camarón cocido", "Salsa coctelera", "Aguacate", "Cebolla", "Cilantro" }, "10 min", "Yucatán"));
            Products.Add(ProductFactory.CreateProduct("6", "Cazón Frito (Orden)", "Orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.", 110m, "Platillos", "Orden", true, true, true, true, 110m, new List<string> { "Cazón fresco", "Aceite vegetal", "Especias", "Acompañamientos" }, "20 min", "Golfo de México"));
            Products.Add(ProductFactory.CreateProduct("7", "Cazón Frito (Media Orden)", "Media orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.", 75m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Cazón fresco", "Aceite vegetal", "Acompañamientos" }, "15 min", "Golfo de México"));
            Products.Add(ProductFactory.CreateProduct("8", "Cazón Entomatado (Orden)", "Delicioso cazón guisado con salsa de tomate y epazote. Disponible únicamente miércoles y viernes.", 110m, "Platillos", "Orden", true, true, true, false, null, new List<string> { "Cazón desmenuzado", "Tomates", "Cebolla", "Epazote" }, "20 min", "Yucatán"));
            Products.Add(ProductFactory.CreateProduct("9", "Cazón Entomatado (Media Orden)", "Media orden de cazón guisado con salsa de tomate. Disponible únicamente miércoles y viernes.", 75m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Cazón desmenuzado", "Tomates", "Cebolla", "Epazote" }, "15 min", "Yucatán"));

            Products.Add(ProductFactory.CreateProduct("10", "Camarón Fresco Crudo", "Camarón crudo fresco sin cáscara ni cabeza. Medida Premium 21/25 ideal para platillos gourmet.", 260m, "Mariscos Frescos", "Kilogramo", true, true, true, false, null, new List<string> { "Camarón crudo desvenado" }, "5 min", "Campeche, México"));
            Products.Add(ProductFactory.CreateProduct("11", "Camarón Cocido con Cabeza", "Camarón cocido entero con cabeza. Medida estándar 41/50 listo para cocteles.", 150m, "Mariscos Frescos", "Kilogramo", true, true, true, false, null, new List<string> { "Camarón cocido entero" }, "5 min", "Celestún, Yucatán"));
            Products.Add(ProductFactory.CreateProduct("12", "Cazón Fresco Rebanado", "Filete o rebanadas de cazón fresco, limpio y listo para preparar en casa.", 120m, "Mariscos Frescos", "Kilogramo", true, true, true, false, null, new List<string> { "Filete de cazón fresco" }, "5 min", "Mérida, Yucatán"));

            Products.Add(ProductFactory.CreateProduct("13", "Tostada Bolsa Grande", "Bolsa grande de tostadas de maíz crujientes, ideales para acompañar ceviches y mariscos. (400g)", 50m, "Tostadas", "Bolsa 400g", true, true, true, false, null, new List<string> { "Maíz", "Aceite", "Sal" }, "3 min", "Mérida, Yucatán"));
            Products.Add(ProductFactory.CreateProduct("14", "Tostada Bolsa Mediana", "Bolsa mediana de tostadas de maíz crujientes. (150g)", 18m, "Tostadas", "Bolsa 150g", true, true, true, false, null, new List<string> { "Maíz", "Aceite", "Sal" }, "3 min", "Mérida, Yucatán"));

            Products.Add(ProductFactory.CreateProduct("15", "Postas de Camarón Fritas", "Camarones sazonados y fritos al momento. Se vende por kilogramo.", 360m, "Frituras", "Kilogramo", true, true, true, false, null, new List<string> { "Camarón entero", "Harina", "Sal", "Ajo" }, "15 min", "Yucatán"));
            Products.Add(ProductFactory.CreateProduct("16", "Pescado Frito Corvinal", "Postas o filetes fritos de pescado Corvina de alta calidad. Se vende por kilogramo.", 330m, "Frituras", "Kilogramo", true, true, true, false, null, new List<string> { "Pescado Corvina", "Aceite", "Limón", "Sal" }, "15 min", "Sisal, Yucatán"));
            Products.Add(ProductFactory.CreateProduct("17", "Pecho Frito de Mero", "Especialidad de la casa: pecho de Mero frito y crujiente. Se vende por kilogramo.", 330m, "Frituras", "Kilogramo", true, true, true, false, null, new List<string> { "Pecho de Mero", "Adobo de la casa", "Aceite" }, "18 min", "Mérida, Yucatán"));
        }
    }
}
