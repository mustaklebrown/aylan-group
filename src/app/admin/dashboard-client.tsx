"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { authClient } from "@/lib/auth-client";
import RichTextEditor from "@/components/RichTextEditor";
import { 
  Newspaper, 
  GraduationCap, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Upload, 
  X, 
  Settings, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Briefcase,
  Target,
  Cpu,
  Globe2,
  BarChart3,
  Users
} from "lucide-react";
import { 
  createBlogPostAction, 
  updateBlogPostAction, 
  deleteBlogPostAction,
  createCourseCategoryAction,
  updateCourseCategoryAction,
  deleteCourseCategoryAction,
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  updatePageSettingsAction
} from "./actions";

// Icons list helper for courses
const availableIcons = ["Briefcase", "Target", "Cpu", "Globe2", "BarChart3", "Users", "BookOpen"];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  iconName: string;
  duration: string;
  categoryId: number;
}

interface CourseCategory {
  id: number;
  category: string;
  courses: Course[];
}

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface DashboardClientProps {
  initialBlogs: BlogPost[];
  initialCategories: CourseCategory[];
  initialProducts: Product[];
  initialSettings: any;
}

export default function AdminDashboardClient({
  initialBlogs,
  initialCategories,
  initialProducts,
  initialSettings
}: DashboardClientProps) {
  // Navigation tabs: 'blogs' | 'formation' | 'products' | 'settings'
  const [activeTab, setActiveTab] = useState<'blogs' | 'formation' | 'products' | 'settings'>('blogs');

  // Dynamic lists from state
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [categories, setCategories] = useState<CourseCategory[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [settings, setSettings] = useState<any>(initialSettings);
  const [blogImageUrl, setBlogImageUrl] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<string>("");

  // Status message states
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Modals state
  const [blogModal, setBlogModal] = useState<{ open: boolean; editMode: boolean; data?: BlogPost | null }>({
    open: false,
    editMode: false,
    data: null,
  });

  const [productModal, setProductModal] = useState<{ open: boolean; editMode: boolean; data?: Product | null }>({
    open: false,
    editMode: false,
    data: null,
  });

  const [courseModal, setCourseModal] = useState<{ open: boolean; editMode: boolean; categoryId: number; data?: Course | null }>({
    open: false,
    editMode: false,
    categoryId: 0,
    data: null,
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null);

  // Helper to show messages that auto-dismiss
  const showStatus = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  /* ==========================================
     BLOG FORM SUBMISSION
     ========================================== */
  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (blogModal.editMode && blogModal.data) {
        const result = await updateBlogPostAction(blogModal.data.id, formData);
        if (result.success && result.post) {
          setBlogs(blogs.map(b => b.id === result.post.id ? result.post : b));
          showStatus("Article mis à jour avec succès !", "success");
        }
      } else {
        const result = await createBlogPostAction(formData);
        if (result.success && result.post) {
          setBlogs([result.post, ...blogs]);
          showStatus("Article créé avec succès !", "success");
        }
      }
      setBlogModal({ open: false, editMode: false, data: null });
    } catch (error: any) {
      showStatus(error.message || "Une erreur est survenue.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlogDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    setActionLoading(true);
    try {
      await deleteBlogPostAction(id);
      setBlogs(blogs.filter(b => b.id !== id));
      showStatus("Article supprimé avec succès.", "success");
    } catch (error: any) {
      showStatus(error.message || "Impossible de supprimer l'article.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ==========================================
     FORMATION ACTIONS
     ========================================== */
  const handleCategoryAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryInput.trim()) return;
    setActionLoading(true);
    try {
      const result = await createCourseCategoryAction(categoryInput);
      if (result.success && result.category) {
        const newCat: CourseCategory = {
          id: result.category.id,
          category: result.category.category,
          courses: []
        };
        setCategories([...categories, newCat]);
        setCategoryInput("");
        showStatus("Catégorie créée !", "success");
      }
    } catch (error: any) {
      showStatus(error.message || "Impossible de créer la catégorie.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCategoryUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) return;
    setActionLoading(true);
    try {
      const result = await updateCourseCategoryAction(editingCategory.id, editingCategory.name);
      if (result.success && result.category) {
        setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, category: result.category.category } : c));
        setEditingCategory(null);
        showStatus("Catégorie renommée !", "success");
      }
    } catch (error: any) {
      showStatus(error.message || "Impossible de renommer la catégorie.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCategoryDelete = async (id: number) => {
    if (!confirm("Voulez-vous supprimer cette catégorie et TOUS les cours qu'elle contient ?")) return;
    setActionLoading(true);
    try {
      await deleteCourseCategoryAction(id);
      setCategories(categories.filter(c => c.id !== id));
      showStatus("Catégorie supprimée.", "success");
    } catch (error: any) {
      showStatus(error.message || "Impossible de supprimer la catégorie.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = e.currentTarget;
    const title = form.elements.namedItem("title") as HTMLInputElement;
    const description = form.elements.namedItem("description") as HTMLTextAreaElement;
    const duration = form.elements.namedItem("duration") as HTMLInputElement;
    const iconName = form.elements.namedItem("iconName") as HTMLSelectElement;

    const data = {
      title: title.value,
      description: description.value,
      duration: duration.value,
      iconName: iconName.value,
    };

    try {
      if (courseModal.editMode && courseModal.data) {
        const result = await updateCourseAction(courseModal.data.id, { ...data, categoryId: courseModal.categoryId });
        if (result.success && result.course) {
          setCategories(categories.map(cat => {
            if (cat.id === courseModal.categoryId) {
              return {
                ...cat,
                courses: cat.courses.map(c => c.id === result.course.id ? result.course : c)
              };
            }
            return cat;
          }));
          showStatus("Cours mis à jour !", "success");
        }
      } else {
        const result = await createCourseAction(courseModal.categoryId, data);
        if (result.success && result.course) {
          setCategories(categories.map(cat => {
            if (cat.id === courseModal.categoryId) {
              return {
                ...cat,
                courses: [...cat.courses, result.course]
              };
            }
            return cat;
          }));
          showStatus("Cours ajouté avec succès !", "success");
        }
      }
      setCourseModal({ open: false, editMode: false, categoryId: 0, data: null });
    } catch (error: any) {
      showStatus(error.message || "Impossible de sauvegarder le cours.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCourseDelete = async (categoryId: number, courseId: number) => {
    if (!confirm("Voulez-vous supprimer ce cours ?")) return;
    setActionLoading(true);
    try {
      await deleteCourseAction(courseId);
      setCategories(categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            courses: cat.courses.filter(c => c.id !== courseId)
          };
        }
        return cat;
      }));
      showStatus("Cours supprimé.", "success");
    } catch (error: any) {
      showStatus(error.message || "Impossible de supprimer le cours.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ==========================================
     PRODUCT FORM SUBMISSION
     ========================================== */
  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (productModal.editMode && productModal.data) {
        const result = await updateProductAction(productModal.data.id, formData);
        if (result.success && result.product) {
          setProducts(products.map(p => p.id === result.product.id ? result.product : p));
          showStatus("Article mis à jour !", "success");
        }
      } else {
        const result = await createProductAction(formData);
        if (result.success && result.product) {
          setProducts([result.product, ...products]);
          showStatus("Article en stock ajouté !", "success");
        }
      }
      setProductModal({ open: false, editMode: false, data: null });
    } catch (error: any) {
      showStatus(error.message || "Impossible d'enregistrer l'article.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleProductDelete = async (id: number) => {
    if (!confirm("Voulez-vous supprimer cet article du stock ?")) return;
    setActionLoading(true);
    try {
      await deleteProductAction(id);
      setProducts(products.filter(p => p.id !== id));
      showStatus("Article supprimé.", "success");
    } catch (error: any) {
      showStatus(error.message || "Impossible de supprimer l'article.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ==========================================
     PAGE SETTINGS FORM SUBMISSION
     ========================================== */
  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>, key: string) => {
    e.preventDefault();
    setActionLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const updatedSettingsObj = { ...settings[key] };
    formData.forEach((value, k) => {
      updatedSettingsObj[k] = value;
    });

    try {
      await updatePageSettingsAction(key, updatedSettingsObj);
      setSettings({
        ...settings,
        [key]: updatedSettingsObj
      });
      showStatus("Texte de la page mis à jour !", "success");
    } catch (error: any) {
      showStatus(error.message || "Impossible de mettre à jour le texte.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 relative">
      {/* Toast Alert */}
      {message && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl transition-all duration-300 animate-slide-in ${
          message.type === "success" 
            ? "bg-green-500/10 border-green-500/30 text-green-400" 
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-semibold text-sm">{message.text}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Tableau de bord</h1>
          <p className="text-text-muted mt-1 text-sm">Gérez les actualités, formations et articles de votre boutique.</p>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0 self-start md:self-center">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'blogs' 
                ? "bg-primary text-white shadow-lg" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <Newspaper size={16} />
            <span>Actualités</span>
          </button>
          
          <button
            onClick={() => setActiveTab('formation')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'formation' 
                ? "bg-primary text-white shadow-lg" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <GraduationCap size={16} />
            <span>Formations</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'products' 
                ? "bg-primary text-white shadow-lg" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <ShoppingBag size={16} />
            <span>Espace Client</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'settings' 
                ? "bg-primary text-white shadow-lg" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <Users size={16} />
            <span>Paramètres</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: BLOGS / ACTUALITES
          ========================================================================= */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Newspaper size={20} className="text-primary" />
              <span>Gérer les articles de Blog</span>
            </h2>
            <button
              onClick={() => {
                setBlogModal({ open: true, editMode: false, data: null });
                setBlogImageUrl("");
              }}
              className="btn btn-primary px-4 py-2 text-xs md:text-sm rounded-xl flex items-center gap-2"
            >
              <Plus size={16} /> Écrire un article
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col h-full group">
                <div className="relative aspect-[16/10] bg-white/5">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider mb-2 block">
                    {blog.date} | Par {blog.author}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-text-muted text-xs line-clamp-3 leading-relaxed mb-6 flex-grow">
                    {blog.excerpt}
                  </p>
                  <div className="flex gap-2 border-t border-white/5 pt-4 mt-auto">
                    <button
                      onClick={() => {
                        setBlogModal({ open: true, editMode: true, data: blog });
                        setBlogImageUrl(blog.image);
                      }}
                      className="flex-grow flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 hover:border-primary/50 text-xs font-semibold text-white/80 hover:text-primary transition-all"
                    >
                      <Edit3 size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleBlogDelete(blog.id)}
                      className="px-3 py-2 rounded-xl border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-xs font-semibold text-white/60 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FORMATION
          ========================================================================= */}
      {activeTab === 'formation' && (
        <div className="space-y-12">
          {/* Header Editable Text */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
              <Settings size={18} className="text-accent" />
              <span>Textes de la page Formation</span>
            </h3>
            <form onSubmit={(e) => handleSettingsSubmit(e, "formation_settings")} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Titre Principal</label>
                <input
                  name="heroTitle"
                  defaultValue={settings.formation_settings?.heroTitle || "Centre de"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Titre Dégradé</label>
                <input
                  name="heroGradientTitle"
                  defaultValue={settings.formation_settings?.heroGradientTitle || "Formation Professionnelle"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs font-bold mb-2">Sous-titre de la page</label>
                <textarea
                  name="heroSubtitle"
                  rows={2}
                  defaultValue={settings.formation_settings?.heroSubtitle || ""}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Titre du Call-To-Action (CTA)</label>
                <input
                  name="ctaTitle"
                  defaultValue={settings.formation_settings?.ctaTitle || "Besoin d'une formation sur mesure ?"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Texte du Bouton CTA</label>
                <input
                  name="ctaButtonText"
                  defaultValue={settings.formation_settings?.ctaButtonText || "Nous contacter pour un devis"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs font-bold mb-2">Description du CTA</label>
                <textarea
                  name="ctaDescription"
                  rows={2}
                  defaultValue={settings.formation_settings?.ctaDescription || ""}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn btn-primary px-6 py-2.5 text-sm rounded-xl flex items-center gap-2">
                  <Save size={16} /> Enregistrer les textes
                </button>
              </div>
            </form>
          </div>

          {/* Categories & Courses Management */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Gérer les cours de formation</h2>
              {/* Add Category Form */}
              <form onSubmit={handleCategoryAdd} className="flex gap-2 max-w-sm w-full">
                <input
                  placeholder="Nouvelle catégorie..."
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs md:text-sm focus:outline-none focus:border-primary"
                />
                <button type="submit" className="bg-primary hover:bg-primary-glow px-4 rounded-xl text-white font-bold text-xs shrink-0 transition-colors">
                  Créer
                </button>
              </form>
            </div>

            {/* List Categories & Courses */}
            <div className="space-y-8">
              {categories.map((cat) => (
                <div key={cat.id} className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
                  {/* Category Title bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    {editingCategory?.id === cat.id ? (
                      <form onSubmit={handleCategoryUpdate} className="flex items-center gap-2 flex-grow max-w-md">
                        <input
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="flex-grow bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none"
                        />
                        <button type="submit" className="text-green-400 p-2 hover:bg-green-500/10 rounded-lg">
                          <Save size={16} />
                        </button>
                        <button type="button" onClick={() => setEditingCategory(null)} className="text-white/60 p-2 hover:bg-white/10 rounded-lg">
                          <X size={16} />
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-white">{cat.category}</h3>
                        <button
                          onClick={() => setEditingCategory({ id: cat.id, name: cat.category })}
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCourseModal({ open: true, editMode: false, categoryId: cat.id, data: null })}
                        className="btn border border-primary/30 hover:border-primary text-primary hover:bg-primary/5 px-3 py-1.5 text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <Plus size={14} /> Ajouter un cours
                      </button>
                      <button
                        onClick={() => handleCategoryDelete(cat.id)}
                        className="text-white/40 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Course Cards under Category */}
                  {cat.courses.length === 0 ? (
                    <p className="text-text-muted text-xs italic">Aucun cours disponible dans cette catégorie.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cat.courses.map((course) => (
                        <div key={course.id} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-between group relative overflow-hidden">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] text-accent uppercase font-bold tracking-widest bg-accent/10 px-2.5 py-1 rounded-md">
                                {course.duration}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setCourseModal({ open: true, editMode: true, categoryId: cat.id, data: course })}
                                  className="text-white/40 hover:text-white p-1"
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  onClick={() => handleCourseDelete(cat.id, course.id)}
                                  className="text-white/40 hover:text-red-400 p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <h4 className="text-md font-bold text-white mb-2">{course.title}</h4>
                            <p className="text-text-muted text-xs leading-relaxed mb-4">{course.description}</p>
                          </div>
                          <div className="text-[10px] text-text-muted border-t border-white/5 pt-3 mt-4 flex items-center gap-1">
                            <span className="font-semibold">Icône:</span>
                            <span className="text-white bg-white/5 px-2 py-0.5 rounded-md font-mono">{course.iconName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: ESPACE CLIENT (PRODUCTS)
          ========================================================================= */}
      {activeTab === 'products' && (
        <div className="space-y-12">
          {/* Espace Client settings form */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
              <Settings size={18} className="text-accent" />
              <span>Textes de l'Espace Client</span>
            </h3>
            <form onSubmit={(e) => handleSettingsSubmit(e, "espace_client_settings")} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Titre Principal</label>
                <input
                  name="heroTitle"
                  defaultValue={settings.espace_client_settings?.heroTitle || "Nos Articles"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Titre Dégradé</label>
                <input
                  name="heroGradientTitle"
                  defaultValue={settings.espace_client_settings?.heroGradientTitle || "Aylan Group"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs font-bold mb-2">Sous-titre de la page</label>
                <textarea
                  name="heroSubtitle"
                  rows={2}
                  defaultValue={settings.espace_client_settings?.heroSubtitle || ""}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Numéro de téléphone (lien click-to-call)</label>
                <input
                  name="phoneNumber"
                  defaultValue={settings.espace_client_settings?.phoneNumber || "+2693340000"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Libellé du Téléphone (Ex: +269 334 00 00)</label>
                <input
                  name="phoneLabel"
                  defaultValue={settings.espace_client_settings?.phoneLabel || "+269 334 00 00"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Titre Aide / Footer CTA</label>
                <input
                  name="ctaTitle"
                  defaultValue={settings.espace_client_settings?.ctaTitle || "Besoin d'aide pour votre commande ?"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 text-xs font-bold mb-2">Description Aide / Footer CTA</label>
                <textarea
                  name="ctaDescription"
                  rows={2}
                  defaultValue={settings.espace_client_settings?.ctaDescription || ""}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn btn-primary px-6 py-2.5 text-sm rounded-xl flex items-center gap-2">
                  <Save size={16} /> Enregistrer la configuration
                </button>
              </div>
            </form>
          </div>

          {/* Products List & CRUD */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <span>Gérer les articles en stock</span>
              </h2>
              <button
                onClick={() => {
                  setProductModal({ open: true, editMode: false, data: null });
                  setProductImageUrl("");
                }}
                className="btn btn-primary px-4 py-2 text-xs md:text-sm rounded-xl flex items-center gap-2"
              >
                <Plus size={16} /> Ajouter un article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col h-full group">
                  <div className="relative aspect-square bg-white/5">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      {prod.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight">
                        {prod.name}
                      </h3>
                      <span className="text-md font-extrabold text-accent shrink-0">
                        {prod.price}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs line-clamp-3 leading-relaxed mb-6 flex-grow">
                      {prod.description}
                    </p>
                    <div className="flex gap-2 border-t border-white/5 pt-4 mt-auto">
                      <button
                        onClick={() => {
                          setProductModal({ open: true, editMode: true, data: prod });
                          setProductImageUrl(prod.image);
                        }}
                        className="flex-grow flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 hover:border-primary/50 text-xs font-semibold text-white/80 hover:text-primary transition-all"
                      >
                        <Edit3 size={14} /> Modifier
                      </button>
                      <button
                        onClick={() => handleProductDelete(prod.id)}
                        className="px-3 py-2 rounded-xl border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-xs font-semibold text-white/60 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS & FORMS
          ========================================================================= */}

      {/* 1. Blog Write / Edit Modal */}
      {blogModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white/15 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-scale-in">
            <button
              onClick={() => setBlogModal({ open: false, editMode: false, data: null })}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-1 hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
              {blogModal.editMode ? "Modifier l'article" : "Rédiger un nouvel article"}
            </h3>

            <form onSubmit={handleBlogSubmit} className="space-y-6 text-sm">
              <input type="hidden" name="existingImageUrl" defaultValue={blogModal.data?.image || ""} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-1.5">Titre de l'article</label>
                  <input
                    name="title"
                    required
                    defaultValue={blogModal.data?.title || ""}
                    placeholder="Comment faire vos achats..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Catégorie</label>
                  <input
                    name="category"
                    required
                    defaultValue={blogModal.data?.category || "Guide"}
                    placeholder="Ex: Guide, Logistique..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Auteur</label>
                  <input
                    name="author"
                    required
                    defaultValue={blogModal.data?.author || "Équipe Aylan"}
                    placeholder="Nom ou département..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Date (Libellé)</label>
                  <input
                    name="date"
                    required
                    defaultValue={blogModal.data?.date || new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    placeholder="Ex: 15 Mai 2024"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-2">Image de couverture (UploadThing)</label>
                  {blogImageUrl ? (
                    <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
                      <Image
                        src={blogImageUrl}
                        alt="Preview cover"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setBlogImageUrl("")}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all shadow-lg"
                        >
                          <Trash2 size={14} />
                          Supprimer l'image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition-colors">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            setBlogImageUrl(res[0].url);
                            showStatus("Image chargée avec succès !", "success");
                          }
                        }}
                        onUploadError={(error: Error) => {
                          showStatus(`Erreur de chargement: ${error.message}`, "error");
                        }}
                        appearance={{
                          button: "bg-primary text-white hover:bg-primary/80 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer",
                          allowedContent: "text-[10px] text-text-muted mt-2",
                        }}
                      />
                    </div>
                  )}
                  <input type="hidden" name="imageUrl" value={blogImageUrl} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-1.5">Extrait (Excerpt)</label>
                  <textarea
                    name="excerpt"
                    required
                    rows={2}
                    defaultValue={blogModal.data?.excerpt || ""}
                    placeholder="Bref résumé accrocheur..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-2">Contenu de l'article</label>
                  <RichTextEditor
                    name="content"
                    defaultValue={blogModal.data?.content || ""}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-white/5 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setBlogModal({ open: false, editMode: false, data: null })}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn btn-primary px-6 py-2.5 text-sm rounded-xl"
                >
                  {actionLoading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Product Add / Edit Modal */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-xl rounded-3xl border border-white/15 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-scale-in">
            <button
              onClick={() => setProductModal({ open: false, editMode: false, data: null })}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-1 hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
              {productModal.editMode ? "Modifier l'article" : "Ajouter un article en stock"}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-6 text-sm">
              <input type="hidden" name="existingImageUrl" defaultValue={productModal.data?.image || ""} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-1.5">Nom de l'article</label>
                  <input
                    name="name"
                    required
                    defaultValue={productModal.data?.name || ""}
                    placeholder="Ex: iPhone 15 Pro Max"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Prix (Ex: 1 250 000 KMF)</label>
                  <input
                    name="price"
                    required
                    defaultValue={productModal.data?.price || ""}
                    placeholder="Ex: 850 000 KMF"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Catégorie</label>
                  <input
                    name="category"
                    required
                    defaultValue={productModal.data?.category || "Électronique"}
                    placeholder="Ex: Mode, Informatique, Mode..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-2">Image du produit (UploadThing)</label>
                  {productImageUrl ? (
                    <div className="relative aspect-[4/3] w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
                      <Image
                        src={productImageUrl}
                        alt="Product cover preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setProductImageUrl("")}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all shadow-lg"
                        >
                          <Trash2 size={14} />
                          Supprimer l'image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition-colors">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            setProductImageUrl(res[0].url);
                            showStatus("Image chargée avec succès !", "success");
                          }
                        }}
                        onUploadError={(error: Error) => {
                          showStatus(`Erreur de chargement: ${error.message}`, "error");
                        }}
                        appearance={{
                          button: "bg-primary text-white hover:bg-primary/80 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer",
                          allowedContent: "text-[10px] text-text-muted mt-2",
                        }}
                      />
                    </div>
                  )}
                  <input type="hidden" name="imageUrl" value={productImageUrl} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-white/80 font-bold mb-1.5">Description de l'article</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    defaultValue={productModal.data?.description || ""}
                    placeholder="Caractéristiques de l'article, options..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-white/5 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setProductModal({ open: false, editMode: false, data: null })}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn btn-primary px-6 py-2.5 text-sm rounded-xl"
                >
                  {actionLoading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Course Add / Edit Modal */}
      {courseModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-white/15 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-scale-in">
            <button
              onClick={() => setCourseModal({ open: false, editMode: false, categoryId: 0, data: null })}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-1 hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
              {courseModal.editMode ? "Modifier le cours" : "Ajouter un programme de formation"}
            </h3>

            <form onSubmit={handleCourseSubmit} className="space-y-6 text-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Nom du programme</label>
                  <input
                    name="title"
                    required
                    defaultValue={courseModal.data?.title || ""}
                    placeholder="Ex: Gestion Stratégique"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 font-bold mb-1.5">Durée (Ex: 40 heures)</label>
                    <input
                      name="duration"
                      required
                      defaultValue={courseModal.data?.duration || ""}
                      placeholder="Ex: 30 heures"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-bold mb-1.5">Icône Lucide</label>
                    <select
                      name="iconName"
                      defaultValue={courseModal.data?.iconName || "BookOpen"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon} className="bg-bg-card text-white">
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1.5">Description du cours</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    defaultValue={courseModal.data?.description || ""}
                    placeholder="Description du contenu et des objectifs du programme..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-white/5 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setCourseModal({ open: false, editMode: false, categoryId: 0, data: null })}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn btn-primary px-6 py-2.5 text-sm rounded-xl"
                >
                  {actionLoading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: PARAMETRES ADMIN
          ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="space-y-12">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
              <Users size={18} className="text-accent" />
              <span>Paramètres du Compte Administrateur</span>
            </h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setActionLoading(true);
              const form = e.currentTarget;
              const formData = new FormData(form);
              const name = formData.get("name") as string;
              const password = formData.get("password") as string;
              const currentPassword = formData.get("currentPassword") as string;

              try {
                if (name) {
                  const { error } = await authClient.updateUser({ name });
                  if (error) throw new Error(error.message);
                }
                
                if (password) {
                  if (!currentPassword) {
                    throw new Error("Veuillez renseigner votre mot de passe actuel pour le modifier.");
                  }
                  const { error } = await authClient.changePassword({ 
                    newPassword: password, 
                    currentPassword, 
                    revokeOtherSessions: true 
                  });
                  if (error) throw new Error(error.message);
                }
                
                showStatus("Profil mis à jour avec succès !", "success");
                if (password) {
                  form.reset();
                }
              } catch (error: any) {
                showStatus(error.message || "Impossible de mettre à jour le profil.", "error");
              } finally {
                setActionLoading(false);
              }
            }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Nom de l'Administrateur</label>
                <input
                  name="name"
                  placeholder="Nouveau nom complet"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold mb-2">Adresse Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="admin@aylan-group.com"
                  readOnly
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/50 text-sm focus:outline-none cursor-not-allowed"
                  title="L'email ne peut pas être modifié ici pour des raisons de sécurité."
                />
              </div>
              <div className="md:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <h4 className="text-white font-bold text-sm">Changer le mot de passe</h4>
                <div>
                  <label className="block text-white/70 text-xs font-bold mb-2">Nouveau Mot de passe (Optionnel)</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Laisser vide pour ne pas modifier"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-bold mb-2">Mot de passe actuel (Requis si modification)</label>
                  <input
                    name="currentPassword"
                    type="password"
                    placeholder="Obligatoire pour confirmer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={actionLoading} className="btn btn-primary px-6 py-2.5 text-sm rounded-xl flex items-center gap-2">
                  <Save size={16} /> {actionLoading ? "Enregistrement..." : "Mettre à jour le profil"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
