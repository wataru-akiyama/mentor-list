// App.jsx - メインアプリケーションファイル
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronRight, ArrowLeft, Mail, Phone, MapPin, Briefcase, Tag, Heart } from 'lucide-react';
import './index.css'; // Tailwind CSSのスタイル

// サンプルデータ
const MENTORS_DATA = [
  {
    id: 1,
    name: '山田 太郎',
    company: 'テクノロジー株式会社',
    position: 'AIエンジニア',
    fields: ['AI', 'プログラミング', 'データサイエンス'],
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=山田太郎',
    description: 'AI技術を活用した新しいサービス開発に取り組んでいます。高校生の頃からプログラミングに興味を持ち、大学ではコンピュータサイエンスを専攻しました。',
    supportTypes: ['オンライン相談', 'メール質問', '職場訪問'],
    region: '東京',
    email: 'yamada.taro@tech-company.jp',
    phone: '03-1234-5678',
  },
  {
    id: 2,
    name: '佐藤 花子',
    company: 'グリーンエネルギー研究所',
    position: '環境研究員',
    fields: ['環境科学', '再生可能エネルギー', '持続可能性'],
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=佐藤花子',
    description: '地球環境問題に取り組む研究者です。特に再生可能エネルギーの普及や持続可能な社会づくりに関心があります。高校生との対話を通じて、若い世代の環境意識を高めたいと考えています。',
    supportTypes: ['オンライン相談', 'メール質問'],
    region: '京都',
    email: 'hanako.sato@green-energy.org',
    phone: '075-987-6543',
  },
  {
    id: 3,
    name: '鈴木 健太',
    company: 'クリエイティブデザイン',
    position: 'UIデザイナー',
    fields: ['デザイン', 'UI/UX', 'アート'],
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=鈴木健太',
    description: 'ユーザー体験を中心に考えたデザインを日々追求しています。使いやすく美しいインターフェースの設計を専門としています。',
    supportTypes: ['メール質問', '職場訪問'],
    region: '大阪',
    email: 'kenta.suzuki@creative-design.com',
    phone: '06-5432-1098',
  },
  {
    id: 4,
    name: '田中 美咲',
    company: 'バイオテック研究所',
    position: '研究員',
    fields: ['生物学', '医療', 'バイオテクノロジー'],
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=田中美咲',
    description: '最先端のバイオテクノロジー研究に携わっています。特に遺伝子編集技術に関する研究を行っており、将来の医療技術の進歩に貢献したいと考えています。',
    supportTypes: ['オンライン相談', 'メール質問'],
    region: '筑波',
    email: 'misaki.tanaka@biotech-lab.jp',
    phone: '029-876-5432',
  },
];

// フィルターのオプション
const FILTER_OPTIONS = [
  { id: 'all', name: '全て' },
  { id: 'tech', name: 'テクノロジー' },
  { id: 'science', name: '理科学' },
  { id: 'art', name: '芸術・デザイン' },
  { id: 'business', name: 'ビジネス' },
];

// 人気のタグ
const POPULAR_TAGS = ['AI', 'デザイン', '環境', '医療', 'プログラミング', 'ビジネス'];

// メインアプリケーションコンポーネント
const App = () => {
  // ステート
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [mentors, setMentors] = useState(MENTORS_DATA);
  
  // ローカルストレージからお気に入りを読み込む
  useEffect(() => {
    const savedFavorites = localStorage.getItem('mentorFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // お気に入りの変更を保存
  useEffect(() => {
    localStorage.setItem('mentorFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // お気に入りの切り替え
  const toggleFavorite = (mentorId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setFavorites(prev => 
      prev.includes(mentorId)
        ? prev.filter(id => id !== mentorId)
        : [...prev, mentorId]
    );
  };
  
  // メンター詳細表示
  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
    setActiveScreen('detail');
  };
  
  // 戻るボタン
  const handleBackClick = () => {
    if (activeScreen === 'detail') {
      setActiveScreen('search');
    } else {
      setActiveScreen('home');
    }
  };
  
  // 検索機能
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setMentors(MENTORS_DATA);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = MENTORS_DATA.filter(mentor => 
      mentor.name.toLowerCase().includes(lowercaseQuery) ||
      mentor.company.toLowerCase().includes(lowercaseQuery) ||
      mentor.position.toLowerCase().includes(lowercaseQuery) ||
      mentor.fields.some(field => field.toLowerCase().includes(lowercaseQuery))
    );
    
    setMentors(filtered);
  };
  
  // タブバーナビゲーション
  const TabBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4">
      <button 
        onClick={() => setActiveScreen('home')}
        className="flex flex-col items-center px-3 py-1"
      >
        <Search size={24} className={activeScreen === 'home' ? "text-indigo-600" : "text-gray-400"} />
        <span className={`text-xs mt-1 ${activeScreen === 'home' ? "text-indigo-600 font-medium" : "text-gray-500"}`}>ホーム</span>
      </button>
      
      <button 
        onClick={() => {
          setActiveScreen('search');
          setActiveTab('search');
        }}
        className="flex flex-col items-center px-3 py-1"
      >
        <Filter size={24} className={(activeScreen === 'search' && activeTab === 'search') ? "text-indigo-600" : "text-gray-400"} />
        <span className={`text-xs mt-1 ${(activeScreen === 'search' && activeTab === 'search') ? "text-indigo-600 font-medium" : "text-gray-500"}`}>検索</span>
      </button>
      
      <button 
        onClick={() => {
          setActiveScreen('search');
          setActiveTab('favorites');
        }}
        className="flex flex-col items-center px-3 py-1"
      >
        <Heart 
          size={24} 
          className={(activeScreen === 'search' && activeTab === 'favorites') ? "text-indigo-600" : "text-gray-400"} 
        />
        <span className={`text-xs mt-1 ${(activeScreen === 'search' && activeTab === 'favorites') ? "text-indigo-600 font-medium" : "text-gray-500"}`}>お気に入り</span>
      </button>
    </div>
  );
  
  // メンターカードコンポーネント
  const MentorCard = ({ mentor }) => (
    <div 
      onClick={() => handleMentorClick(mentor)}
      className="bg-white rounded-xl shadow-sm p-4 flex items-start cursor-pointer hover:shadow-md transition-shadow relative"
    >
      <img 
        src={mentor.image} 
        alt={mentor.name} 
        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-100"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{mentor.company} | {mentor.position}</p>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {mentor.fields.slice(0, 2).map(field => (
            <span key={field} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">
              {field}
            </span>
          ))}
          {mentor.fields.length > 2 && (
            <span className="text-xs text-gray-500">+{mentor.fields.length - 2}</span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <button 
          onClick={(e) => toggleFavorite(mentor.id, e)}
          className="mb-2 focus:outline-none"
        >
          <Heart 
            size={20} 
            className={favorites.includes(mentor.id) 
              ? "fill-red-500 text-red-500" 
              : "text-gray-300 hover:text-red-400"} 
          />
        </button>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  );
  
  // ホーム画面
  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-20 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">メンターリスト</h1>
          <p className="text-gray-600">探究学習のための専門家とつながろう</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">なにを探究していますか？</h2>
          
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="キーワードで検索..." 
              className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
          </div>
          
          <button 
            onClick={() => {
              handleSearch(searchQuery);
              setActiveScreen('search');
            }}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
          >
            検索する
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">人気の分野</h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map(tag => (
              <span 
                key={tag} 
                onClick={() => {
                  setSearchQuery(tag);
                  handleSearch(tag);
                  setActiveScreen('search');
                }}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
  
  // 検索画面
  const SearchScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <button onClick={handleBackClick} className="mr-3">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="キーワードで検索..." 
              className="w-full py-2 px-3 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
          </div>
          
          <button className="ml-3">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto py-3 px-4 flex items-center space-x-2 border-b border-gray-200 bg-white">
        {FILTER_OPTIONS.map(option => (
          <button
            key={option.id}
            onClick={() => setActiveFilter(option.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium ${
              activeFilter === option.id 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
      
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500">{mentors.length}人のメンターが見つかりました</p>
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('search')}
              className={`px-3 py-1 text-sm font-medium rounded-l-lg ${
                activeTab === 'search' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              検索
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`px-3 py-1 text-sm font-medium rounded-r-lg ${
                activeTab === 'favorites' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              お気に入り
            </button>
          </div>
        </div>
        
        {activeTab === 'search' ? (
          <div className="space-y-3">
            {mentors.length > 0 ? (
              mentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)
            ) : (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">メンターが見つかりません</h3>
                <p className="text-gray-500 text-sm mb-4">検索条件を変更してみてください</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.length > 0 ? (
              MENTORS_DATA
                .filter(mentor => favorites.includes(mentor.id))
                .map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)
            ) : (
              <div className="text-center py-12">
                <Heart size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">お気に入りがありません</h3>
                <p className="text-gray-500 text-sm mb-4">気になるメンターをお気に入り登録しましょう</p>
                <button 
                  onClick={() => setActiveTab('search')}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                >
                  メンターを探す
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <TabBar />
    </div>
  );
  
  // 詳細画面
  const DetailScreen = () => {
    if (!selectedMentor) return null;
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-indigo-600 text-white">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center">
            <button onClick={handleBackClick} className="mr-3">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-lg font-medium">メンタープロフィール</h1>
            <button 
              onClick={(e) => toggleFavorite(selectedMentor.id, e)} 
              className="ml-auto focus:outline-none"
            >
              <Heart 
                size={20} 
                className={favorites.includes(selectedMentor.id) 
                  ? "fill-white text-white" 
                  : "text-white"} 
              />
            </button>
          </div>
        </div>
        
        <div className="max-w-md mx-auto px-4 pb-8 pt-4">
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 text-center border-b border-gray-100">
              <img 
                src={selectedMentor.image} 
                alt={selectedMentor.name} 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow"
              />
              <h2 className="text-xl font-bold text-gray-900">{selectedMentor.name}</h2>
              <p className="text-gray-600 mb-2">{selectedMentor.position}</p>
              
              <div className="flex items-center justify-center mb-3">
                <Briefcase size={16} className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">{selectedMentor.company}</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {selectedMentor.fields.map(field => (
                  <span key={field} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {field}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">自己紹介</h3>
              <p className="text-gray-700 mb-6">{selectedMentor.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">サポート内容</h3>
              <div className="mb-6">
                {selectedMentor.supportTypes.map(type => (
                  <div key={type} className="flex items-center py-2">
                    <Tag size={16} className="text-indigo-500 mr-3" />
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">活動地域</h3>
              <div className="flex items-center mb-6">
                <MapPin size={16} className="text-indigo-500 mr-3" />
                <span className="text-gray-700">{selectedMentor.region}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">連絡先</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center py-2">
                  <Mail size={16} className="text-indigo-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 break-all">{selectedMentor.email}</span>
                </div>
                <div className="flex items-center py-2">
                  <Phone size={16} className="text-indigo-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{selectedMentor.phone}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 bg-indigo-50 rounded-lg p-4">
                <strong>連絡する際のポイント:</strong> メンターに連絡する際は、自己紹介と探究テーマを簡潔に説明し、具体的な質問内容を明確に伝えましょう。事前に質問を整理しておくと効果的です。
              </p>
            </div>
          </div>
        </div>
        
        <TabBar />
      </div>
    );
  };
  
  // 画面の表示
  return (
    <div className="font-sans antialiased text-gray-900">
      {activeScreen === 'home' && <HomeScreen />}
      {activeScreen === 'search' && <SearchScreen />}
      {activeScreen === 'detail' && <DetailScreen />}
    </div>
  );
};

export default App;