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
      name: 'Кристалл Души +16',
      category: 'crystals',
      price: 15000,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/38970701-91fc-4548-85a6-045feaac369b.jpg',
      description: 'Легендарный кристалл для усиления оружия',
      badge: 'Легенда'
    },
    {
      id: 2,
      name: 'Доспех Дракона S-Grade',
      category: 'armor',
      price: 89000,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/36cc0ee0-aaf1-4224-8d24-5b1cc56fc0d3.jpg',
      description: 'Эпический комплект брони'
    },
    {
      id: 3,
      name: 'Свиток Воскрешения x100',
      category: 'consumables',
      price: 8900,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/38970701-91fc-4548-85a6-045feaac369b.jpg',
      description: 'Пакет свитков для рейдов'
    },
    {
      id: 4,
      name: 'Меч Заррича +10',
      category: 'weapons',
      price: 125000,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/36cc0ee0-aaf1-4224-8d24-5b1cc56fc0d3.jpg',
      description: 'Легендарное оружие',
      badge: 'ТОП'
    },
    {
      id: 5,
      name: 'Элексир Здоровья x50',
      category: 'consumables',
      price: 4500,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/38970701-91fc-4548-85a6-045feaac369b.jpg',
      description: 'Моментальное восстановление HP'
    },
    {
      id: 6,
      name: 'Камень Телепортации x200',
      category: 'consumables',
      price: 12000,
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/38970701-91fc-4548-85a6-045feaac369b.jpg',
      description: 'Быстрое перемещение по миру'
    }
  ];

  const galleryWorks = [
    {
      title: 'Рейд на Баюма',
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/36cc0ee0-aaf1-4224-8d24-5b1cc56fc0d3.jpg',
      author: 'Клан DragonKnights'
    },
    {
      title: 'Массовое PvP Castle Siege',
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/93b9c6cb-c4b3-4ee2-b5ec-ae2e81a4fe93.jpg',
      author: 'Клан DarkLegion'
    },
    {
      title: 'Эпические Боссы',
      image: 'https://cdn.poehali.dev/projects/cd648560-8c61-45b5-8f1e-b960cc3a3063/files/36cc0ee0-aaf1-4224-8d24-5b1cc56fc0d3.jpg',
      author: 'Сервер Phoenix'
    }
  ];

  const masterClasses = [
    {
      title: 'Гайд по прокачке 1-85 уровень',
      duration: 'x5 рейты',
      level: 'Новичок',
      price: 0
    },
    {
      title: 'Лучшие билды для PvP',
      duration: 'х7 рейты',
      level: 'Опытный',
      price: 0
    },
    {
      title: 'Тактики осады замков',
      duration: 'х10 рейты',
      level: 'Профи',
      price: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'Всё', icon: 'Grid3x3' },
    { id: 'weapons', name: 'Оружие', icon: 'Sword' },
    { id: 'armor', name: 'Броня', icon: 'Shield' },
    { id: 'crystals', name: 'Кристаллы', icon: 'Gem' },
    { id: 'consumables', name: 'Расходники', icon: 'Package' }
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
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">Lineage II</h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-foreground/80 hover:text-foreground transition-colors">Магазин</a>
              <a href="#gallery" className="text-foreground/80 hover:text-foreground transition-colors">Скриншоты</a>
              <a href="#courses" className="text-foreground/80 hover:text-foreground transition-colors">Серверы</a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">О проекте</a>
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
            <Badge className="mb-6 bg-gradient-resin border-0 text-white">⚔️ Войди в легенду</Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Lineage II
              <span className="block text-gradient mt-2">Private Server</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Лучший приватный сервер Lineage 2. Высокие рейты, стабильная работа, активное комьюнити.
              Эпические осады замков и PvP-баталии ждут тебя!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-resin hover:opacity-90 hover-scale resin-glow">
                <Icon name="Play" className="mr-2" size={20} />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="glass-card hover-scale">
                <Icon name="Download" className="mr-2" size={20} />
                Скачать клиент
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Игровой магазин</h3>
            <p className="text-muted-foreground text-lg">Купи донат предметы и стань сильнее</p>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск предметов..."
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
            <h3 className="text-4xl font-bold mb-4">Скриншоты игры</h3>
            <p className="text-muted-foreground text-lg">Эпические моменты наших игроков</p>
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
            <h3 className="text-4xl font-bold mb-4">Информация о сервере</h3>
            <p className="text-muted-foreground text-lg">Выбери свой сервер и начни путь героя</p>
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
                    Выбрать сервер
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
                  Наш проект Lineage II существует уже более 5 лет. Мы создали стабильный и сбалансированный мир,
                  где каждый игрок может проявить себя. Профессиональная команда администрации, регулярные обновления
                  и события делают игру увлекательной каждый день.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-resin rounded-full flex items-center justify-center mx-auto mb-4 resin-glow">
                      <Icon name="CheckCircle2" size={32} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Стабильность</h4>
                    <p className="text-sm text-muted-foreground">Серверы работают 24/7 без лагов</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-resin rounded-full flex items-center justify-center mx-auto mb-4 resin-glow">
                      <Icon name="Truck" size={32} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Баланс</h4>
                    <p className="text-sm text-muted-foreground">Честная игра без читеров</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-resin rounded-full flex items-center justify-center mx-auto mb-4 resin-glow">
                      <Icon name="Users" size={32} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Сообщество</h4>
                    <p className="text-sm text-muted-foreground">Активное комьюнити и кланы</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="mt-12">
                  <AccordionItem value="item-1" className="border-white/10">
                    <AccordionTrigger className="text-lg">Какие рейты на сервере?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      У нас 3 сервера с разными рейтами: х5 (классика), х7 (средние) и х10 (быстрая прокачка).
                      Выбирайте тот, который подходит вашему стилю игры.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-white/10">
                    <AccordionTrigger className="text-lg">Как начать играть?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Скачайте клиент игры, зарегистрируйтесь на сайте, создайте персонажа и начните свое приключение.
                      Новичкам выдается стартовый набор для быстрого старта.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-white/10">
                    <AccordionTrigger className="text-lg">Есть ли донат?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Да, но он не влияет на баланс игры. Донат позволяет ускорить прокачку и получить
                      косметические предметы. Всё игровое можно получить без вложений.
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
                <h4 className="font-bold text-xl text-gradient">Lineage II</h4>
              </div>
              <p className="text-muted-foreground">
                Легендарная MMORPG. Войди в мир приключений
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Игра</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="hover:text-foreground cursor-pointer transition-colors">Скачать клиент</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Регистрация</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Новости</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Форум</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={16} />
                  Discord сервер
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@lineage2.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  Онлайн: 2,450 игроков
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
            © 2024 Lineage II Private Server. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;