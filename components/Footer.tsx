import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-serif font-bold text-neutral-900 italic">aigpt.id</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mb-6">
              Platform kurasi alat AI generatif dan otomatisasi bisnis. 
              Membantu profesional Indonesia bekerja lebih cerdas dengan teknologi tepat guna.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-neutral-900 font-bold mb-6 text-sm uppercase tracking-wider">Direktori</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Keuangan & Akuntansi</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">HR & Legal</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Travel Generator</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-neutral-900 font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Privasi</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Syarat Ketentuan</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
             <h4 className="text-neutral-900 font-bold mb-6 text-sm uppercase tracking-wider">Update Mingguan</h4>
             <div className="flex gap-2 border-b border-neutral-300 pb-2">
                <input type="email" placeholder="Email Anda" className="bg-transparent border-none text-neutral-900 w-full focus:ring-0 px-0 placeholder:text-neutral-400 text-sm" />
                <button className="text-neutral-900 font-medium text-sm hover:text-primary-700">Join</button>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-100 text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} aigpt.id. Jakarta, Indonesia.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;