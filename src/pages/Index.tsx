import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Беспроводные наушники Pro',
      category: 'audio',
      price: 12990,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/406600ea-b226-480c-b65a-54c17d2123f0.jpg',
      description: 'Премиум качество звука с активным шумоподавлением',
      discount: 15
    },
    {
      id: 2,
      name: 'Умные часы Elite',
      category: 'watches',
      price: 24990,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/b01e4090-93d0-4b38-9b73-c1ae4ccc4809.jpg',
      description: 'Отслеживание здоровья и уведомления'
    },
    {
      id: 3,
      name: 'Смартфон X Pro Max',
      category: 'phones',
      price: 89990,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/48906c08-0ff1-4cfc-a518-f029c2ce2657.jpg',
      description: 'Флагманская камера и производительность',
      discount: 10
    },
    {
      id: 4,
      name: 'Наушники Sport',
      category: 'audio',
      price: 5990,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/406600ea-b226-480c-b65a-54c17d2123f0.jpg',
      description: 'Для спорта и активного образа жизни'
    },
    {
      id: 5,
      name: 'Фитнес-браслет',
      category: 'watches',
      price: 3990,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/b01e4090-93d0-4b38-9b73-c1ae4ccc4809.jpg',
      description: 'Мониторинг активности 24/7'
    },
    {
      id: 6,
      name: 'Смартфон Basic',
      category: 'phones',
      price: 19990,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/48906c08-0ff1-4cfc-a518-f029c2ce2657.jpg',
      description: 'Надежный и доступный смартфон'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'audio', name: 'Аудио', icon: 'Headphones' },
    { id: 'watches', name: 'Часы', icon: 'Watch' },
    { id: 'phones', name: 'Телефоны', icon: 'Smartphone' }
  ];

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = products
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(p => p.name)
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const reviews = [
    { name: 'Александр М.', rating: 5, text: 'Отличный магазин! Быстрая доставка и качественные товары.' },
    { name: 'Мария К.', rating: 5, text: 'Наушники Pro просто шикарные, звук потрясающий!' },
    { name: 'Дмитрий В.', rating: 4, text: 'Хороший выбор техники, цены адекватные.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">TechStore</h1>
            
            <div className="flex-1 max-w-xl relative">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-card"
                />
              </div>
              
              {suggestions.length > 0 && (
                <Card className="absolute top-full mt-2 w-full glass-card animate-fade-in z-50">
                  <CardContent className="p-2">
                    {suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(suggestion)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-accent/50 transition-colors"
                      >
                        <Icon name="Search" size={16} className="inline mr-2 text-muted-foreground" />
                        {suggestion}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative glass-card">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-purple">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cart.length}`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {cart.map(item => {
                    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
                    return (
                      <Card key={item.id} className="glass-card">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto" onClick={() => removeFromCart(item.id)}>
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {cart.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-gradient">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <Button className="w-full bg-gradient-purple hover:opacity-90" size="lg">
                      Оформить заказ
                      <Icon name="ArrowRight" className="ml-2" size={20} />
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Современная техника
              <span className="block text-gradient">для вашей жизни</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Лучшие гаджеты и аксессуары с быстрой доставкой
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-purple hover:opacity-90 hover-scale">
                <Icon name="ShoppingBag" className="mr-2" size={20} />
                Каталог
              </Button>
              <Button size="lg" variant="outline" className="glass-card hover-scale">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Акции
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass-card mb-8">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                  <Icon name={cat.icon as any} size={18} />
                  <span className="hidden sm:inline">{cat.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(cat => (
              <TabsContent key={cat.id} value={cat.id} className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, i) => (
                    <Card key={product.id} className="glass-card hover-scale overflow-hidden group" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.discount && (
                          <Badge className="absolute top-4 right-4 bg-gradient-orange">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          {product.discount ? (
                            <>
                              <span className="text-2xl font-bold text-gradient">
                                {(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                              </span>
                              <span className="text-muted-foreground line-through">
                                {product.price.toLocaleString()} ₽
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-gradient">
                              {product.price.toLocaleString()} ₽
                            </span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-gradient-purple hover:opacity-90"
                          onClick={() => addToCart(product)}
                        >
                          <Icon name="ShoppingCart" className="mr-2" size={18} />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Отзывы покупателей</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <Card key={i} className="glass-card animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">О нас</h3>
            <Card className="glass-card">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  TechStore — это современный интернет-магазин электроники и гаджетов. 
                  Мы тщательно отбираем только качественную технику от проверенных производителей.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="ShieldCheck" size={32} />
                    </div>
                    <h4 className="font-semibold mb-2">Гарантия качества</h4>
                    <p className="text-sm text-muted-foreground">Официальная гарантия на все товары</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Truck" size={32} />
                    </div>
                    <h4 className="font-semibold mb-2">Быстрая доставка</h4>
                    <p className="text-sm text-muted-foreground">Доставка по всей России за 1-3 дня</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="HeadphonesIcon" size={32} />
                    </div>
                    <h4 className="font-semibold mb-2">Поддержка 24/7</h4>
                    <p className="text-sm text-muted-foreground">Всегда готовы помочь</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <h4 className="font-bold text-xl mb-4 text-gradient">TechStore</h4>
              <p className="text-muted-foreground">
                Лучшая техника для вашей жизни
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@techstore.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Примерная, 123
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="glass-card hover-scale">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="glass-card hover-scale">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="glass-card hover-scale">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-muted-foreground">
            © 2024 TechStore. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
