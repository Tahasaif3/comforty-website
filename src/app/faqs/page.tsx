// app/page.tsx (or create your own dynamic route)
export default function Home() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions Looks Here
          </h2>
          <p className="mt-4 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ Items */}
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-[#F7F7F7]"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between items-center">
                {item.question}
                <span className="text-gray-500 text-2xl font-bold">+</span>
              </h3>
              <p className="mt-4 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Sample FAQ Data
  const faqItems = [
    {
      question: 'What types of chairs do you offer?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim.',
    },
    {
      question: 'How can we get in touch with you?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim.',
    },
    {
      question: 'Do your chairs come with a warranty?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim.',
    },
    {
      question: 'What will be delivered? And When?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim.',
    },
    {
      question: 'Can I try a chair before purchasing?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim.',
    },
    {
      question: 'How do I clean and maintain my Comforty chair?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veritatis enim.',
    },
  ];
  