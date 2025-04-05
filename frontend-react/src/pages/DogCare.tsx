import React from "react";

const DogCare: React.FC = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="text-center mb-3">
                Learn how to take care of your dog
              </h1>
              <p className="text-muted text-center mb-4">
                Congratulations on welcoming a new dog into your life! Proper
                care is essential for your canine companion. From feeding and
                grooming to exercise and training, our Dog Care page provides
                you with valuable information to ensure your dog leads a happy
                and healthy life.
              </p>

              <div className="mb-4 pb-3 border-bottom">
                <h3 className="text-success mb-3">Feeding:</h3>
                <p className="text-muted mb-3">
                  Dogs require a balanced diet to maintain their health. It is
                  important to provide them with the right amount of nutrients,
                  including protein, carbohydrates, fats, vitamins, and
                  minerals. Consult your veterinarian to determine the best diet
                  for your dog based on its breed, age, and activity level. Be
                  sure to provide fresh water at all times.
                </p>
                <ul className="text-muted mb-0">
                  <li className="mb-2">
                    Feed your dog high-quality commercial dog food or a
                    well-balanced homemade diet.
                  </li>
                  <li className="mb-2">
                    Do not feed your dog chocolate, grapes, raisins, onions,
                    garlic, or foods that contain xylitol, as they can be toxic
                    to dogs.
                  </li>
                  <li>
                    Monitor your dog's weight and adjust its diet as needed to
                    prevent obesity or malnutrition.
                  </li>
                </ul>
              </div>

              <div className="mb-4 pb-3 border-bottom">
                <h3 className="text-success mb-3">Grooming:</h3>
                <p className="text-muted mb-3">
                  Regular grooming is essential to keep your dog clean and
                  healthy. It also provides an opportunity to check for any
                  signs of skin issues, parasites, or injuries. The grooming
                  needs of your dog will depend on its breed, coat type, and
                  activity level.
                </p>
                <ul className="text-muted mb-0">
                  <li className="mb-2">
                    Brush your dog's coat regularly to remove loose hair and
                    prevent matting.
                  </li>
                  <li className="mb-2">
                    Trim your dog's nails to keep them at a comfortable length
                    and prevent overgrowth.
                  </li>
                  <li>
                    Clean your dog's ears and teeth to prevent infections and
                    dental issues.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-success mb-3">Exercise:</h3>
                <p className="text-muted mb-3">
                  Dogs need regular physical activity to maintain their overall
                  health and well-being. Exercise helps prevent obesity,
                  promotes muscle strength, and provides mental stimulation. The
                  amount and type of exercise your dog needs will depend on its
                  breed, age, and health status.
                </p>
                <ul className="text-muted mb-0">
                  <li className="mb-2">
                    Take your dog for daily walks to provide mental and physical
                    stimulation.
                  </li>
                  <li className="mb-2">
                    Engage in interactive play with your dog, such as fetch,
                    tug-of-war, or agility training.
                  </li>
                  <li>
                    Consider enrolling your dog in obedience classes or dog
                    sports to provide structured exercise and mental
                    stimulation.
                  </li>
                </ul>
              </div>

              <div className="text-center text-muted small mt-4 pt-3 border-top">
                Source:{" "}
                <a
                  href="https://animalfoundation.com/whats-going-on/blog/basic-necessities-proper-pet-care"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  The Animal Foundation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogCare;
