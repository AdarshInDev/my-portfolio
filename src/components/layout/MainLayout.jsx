import StarField from '../visuals/StarField';
import SideStackNav from './SideStackNav';

const MainLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full text-white overflow-hidden">
            <StarField />

            <SideStackNav />

            {/* Content Layer */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
                {children}
            </main>

            {/* Optional: Add Overlay Gradients for Depth */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/80 z-0" />
        </div>
    );
};

export default MainLayout;
