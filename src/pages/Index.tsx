import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Эпоксидная смола Crystal Pro',
      category: 'resin',
      price: 2890,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/9cc8fe2a-01db-4e0e-ab87-d5714eb45177.jpg',
      description: 'Кристально прозрачная смола для заливки',
      badge: 'Хит'
    },
    {
      id: 2,
      name: 'Набор пигментов 12 цветов',
      category: 'pigments',
      price: 1490,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/7767a759-1b42-4a20-8bbe-24f52a942456.jpg',
      description: 'Яркие концентрированные пигменты'
    },
    {
      id: 3,
      name: 'Силиконовые формы Ocean Wave',
      category: 'molds',
      price: 890,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/2d07f6da-f5f0-4608-ae98-6e8f1e3cdb3a.jpg',
      description: 'Набор форм для создания подставок'
    },
    {
      id: 4,
      name: 'Эпоксидная смола River Table',
      category: 'resin',
      price: 4590,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/9cc8fe2a-01db-4e0e-ab87-d5714eb45177.jpg',
      description: 'Специальная смола для столов-рек',
      badge: 'New'
    },
    {
      id: 5,
      name: 'Металлические пигменты Premium',
      category: 'pigments',
      price: 1890,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/7767a759-1b42-4a20-8bbe-24f52a942456.jpg',
      description: 'Золото, серебро, медь'
    },
    {
      id: 6,
      name: 'Набор инструментов для работы',
      category: 'tools',
      price: 2190,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/7767a759-1b42-4a20-8bbe-24f52a942456.jpg',
      description: 'Миксеры, шпатели, стаканы'
    }
  ];

  const galleryWorks = [
    {
      title: 'Стол-река Ocean Blue',
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/2d07f6da-f5f0-4608-ae98-6e8f1e3cdb3a.jpg',
      author: 'Мария К.'
    },
    {
      title: 'Подстаканники с цветами',
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/7767a759-1b42-4a20-8bbe-24f52a942456.jpg',
      author: 'Александр П.'
    },
    {
      title: 'Ювелирные украшения',
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/9cc8fe2a-01db-4e0e-ab87-d5714eb45177.jpg',
      author: 'Елена С.'
    }
  ];

  const masterClasses = [
    {
      title: 'Создание столешницы с эффектом океана',
      duration: '3 часа',
      level: 'Средний',
      price: 3500
    },
    {
      title: 'Ювелирные украшения из эпоксидной смолы',
      duration: '2 часа',
      level: 'Начинающий',
      price: 2500
    },
    {
      title: 'Картины в технике Resin Art',
      duration: '4 часа',
      level: 'Продвинутый',
      price: 4500
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'resin', name: 'Смола', icon: 'Droplets' },
    { id: 'pigments', name: 'Пигменты', icon: 'Palette' },
    { id: 'molds', name: 'Формы', icon: 'Square' },
    { id: 'tools', name: 'Инструменты', icon: 'Wrench' }
  ];

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

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-resin resin-glow flex items-center justify-center">
                <Icon name="Droplets" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">ResinCraft</h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-foreground/80 hover:text-foreground transition-colors">Каталог</a>
              <a href="#gallery" className="text-foreground/80 hover:text-foreground transition-colors">Галерея</a>
              <a href="#courses" className="text-foreground/80 hover:text-foreground transition-colors">Обучение</a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">О нас</a>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative glass-card">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-resin">
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
                  {cart.map(item => (
                    <Card key={item.id} className="glass-card">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
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
                  ))}
                </div>

                {cart.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-gradient">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <Button className="w-full bg-gradient-resin hover:opacity-90 resin-glow" size="lg">
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

      <section className="relative py-32 overflow-hidden wave-bg">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-gradient-resin border-0 text-white">✨ Творите с нами</Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Эпоксидная смола
              <span className="block text-gradient mt-2">для ваших шедевров</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Премиальные материалы для создания уникальных изделий из эпоксидной смолы. 
              Столы, украшения, декор — воплотите свои идеи в жизнь.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-resin hover:opacity-90 hover-scale resin-glow">
                <Icon name="ShoppingBag" className="mr-2" size={20} />
                Каталог товаров
              </Button>
              <Button size="lg" variant="outline" className="glass-card hover-scale">
                <Icon name="GraduationCap" className="mr-2" size={20} />
                Мастер-классы
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Каталог материалов</h3>
            <p className="text-muted-foreground text-lg">Всё необходимое для работы с эпоксидной смолой</p>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card"
              />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 glass-card mb-12">
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
                    <Card key={product.id} className="glass-card hover-scale overflow-hidden group resin-glow" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.badge && (
                          <Badge className="absolute top-4 right-4 bg-gradient-resin border-0">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="text-3xl font-bold text-gradient">
                          {product.price.toLocaleString()} ₽
                        </span>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-gradient-resin hover:opacity-90"
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

      <section id="gallery" className="py-16 bg-gradient-to-b from-transparent to-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Галерея работ</h3>
            <p className="text-muted-foreground text-lg">Вдохновляйтесь работами наших мастеров</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryWorks.map((work, i) => (
              <Card key={i} className="glass-card overflow-hidden hover-scale group" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{work.title}</h4>
                      <p className="text-white/80 flex items-center gap-2">
                        <Icon name="User" size={16} />
                        {work.author}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Мастер-классы</h3>
            <p className="text-muted-foreground text-lg">Научитесь создавать шедевры своими руками</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {masterClasses.map((course, i) => (
              <Card key={i} className="glass-card resin-glow animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Icon name="GraduationCap" size={32} className="text-primary" />
                    <Badge variant="outline" className="border-primary/50">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Icon name="Clock" size={16} />
                    {course.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gradient">{course.price.toLocaleString()} ₽</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-resin hover:opacity-90">
                    Записаться
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 border-t border-white/10 wave-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">О нас</h3>
              <p className="text-muted-foreground text-lg">Всё о нашем магазине и материалах</p>
            </div>
            <Card className="glass-card resin-glow">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  ResinCraft — это профессиональный магазин материалов для работы с эпоксидной смолой. 
                  Мы предлагаем только качественную продукцию от проверенных производителей и помогаем 
                  мастерам воплощать самые смелые творческие идеи.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-resin rounded-full flex items-center justify-center mx-auto mb-4 resin-glow">
                      <Icon name="CheckCircle2" size={32} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Качество</h4>
                    <p className="text-sm text-muted-foreground">Только сертифицированные материалы</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-resin rounded-full flex items-center justify-center mx-auto mb-4 resin-glow">
                      <Icon name="Truck" size={32} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Доставка</h4>
                    <p className="text-sm text-muted-foreground">Быстрая доставка по всей России</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-resin rounded-full flex items-center justify-center mx-auto mb-4 resin-glow">
                      <Icon name="Users" size={32} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Поддержка</h4>
                    <p className="text-sm text-muted-foreground">Консультации опытных мастеров</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="mt-12">
                  <AccordionItem value="item-1" className="border-white/10">
                    <AccordionTrigger className="text-lg">Как выбрать смолу для моего проекта?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Выбор смолы зависит от типа изделия. Для столов подходит River Table, для украшений — Crystal Pro. 
                      Наши консультанты помогут подобрать оптимальный вариант.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-white/10">
                    <AccordionTrigger className="text-lg">Какие инструменты необходимы для начала работы?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Базовый набор включает: смолу, отвердитель, формы, пигменты, миксер, защитные перчатки 
                      и одноразовые стаканчики для смешивания.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-white/10">
                    <AccordionTrigger className="text-lg">Предоставляете ли вы обучение?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Да! Мы регулярно проводим мастер-классы для начинающих и опытных мастеров. 
                      Записаться можно в разделе "Мастер-классы".
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-resin resin-glow flex items-center justify-center">
                  <Icon name="Droplets" size={24} className="text-white" />
                </div>
                <h4 className="font-bold text-xl text-gradient">ResinCraft</h4>
              </div>
              <p className="text-muted-foreground">
                Материалы для создания уникальных изделий из эпоксидной смолы
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="hover:text-foreground cursor-pointer transition-colors">Эпоксидная смола</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Пигменты и красители</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Формы и молды</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Инструменты</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 456-78-90
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@resincraft.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Мастеров, 45
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="glass-card hover-scale resin-glow">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="glass-card hover-scale resin-glow">
                  <Icon name="Youtube" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="glass-card hover-scale resin-glow">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground">
            © 2024 ResinCraft. Творите с вдохновением.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
