import Header from "@/components/Header";
import BookingFloatingButton from "@/components/BookingFloatingButton";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";
import LoginPopup from "@/components/LoginPopup";
import StoreMaintenanceGuard from "@/components/StoreMaintenanceGuard";

export default function StoreLayout({ children }) {
  return (
    <StoreMaintenanceGuard>
      <Header />
      {children}
      <BookingFloatingButton />
      <FloatingCart />
      <LoginPopup />
      <Footer />
    </StoreMaintenanceGuard>
  );
}
