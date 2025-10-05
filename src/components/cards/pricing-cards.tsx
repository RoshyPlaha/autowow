import Link from 'next/link';

const PricingCard = ({ title, price, features, colour, visible }: { title: string, price: string, features: string[], colour: string, visible: boolean }) => {
  return (
    <div className="flex flex-col p-6 mx-4 max-w-lg bg-[#FAF9F6] rounded-lg border shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <div className="text-center mb-6">
        <span className="text-4xl font-bold">{price}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/">
        <button
          className={`mt-auto ${visible ? colour : 'bg-gray-400'} text-white py-2 px-4 rounded-lg transition-colors ${
            visible ? `hover:${colour}` : 'cursor-not-allowed opacity-50'
          }`}
          disabled={!visible}
        >
          Create Capsule
        </button>
      </Link>
    </div>
  );
};

export default PricingCard;