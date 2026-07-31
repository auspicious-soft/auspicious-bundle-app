export default function FreeGiftBanner({
  children = "+ FREE special gift!",
}) {
  return (
    <div className="free-gift-banner">
      {children}
    </div>
  );
}