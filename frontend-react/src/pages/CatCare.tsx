import React from "react";
import "./Care.css";

const CatCare: React.FC = () => {
  return (
    <div className="care cat-care">
      <h1>Learn how to take care of your cat</h1>
      <p className="intro">
        Cats make wonderful companions, and providing them with the right care
        is crucial for their well-being. Explore our Cat Care page for essential
        information on feeding, grooming, and creating a safe and enriching
        environment for your feline friend.
      </p>

      <section className="care-section">
        <h3>Feeding:</h3>
        <p>
          Cats require a balanced diet to maintain their health. It is important
          to provide them with the right amount of nutrients, including protein,
          carbohydrates, fats, vitamins, and minerals. Consult your veterinarian
          to determine the best diet for your cat based on its breed, age, and
          activity level. Be sure to provide fresh water at all times.
        </p>
        <ul>
          <li>
            Feed your cat high-quality commercial cat food or a well-balanced
            homemade diet.
          </li>
          <li>
            Do not feed your cat chocolate, grapes, raisins, onions, garlic, or
            foods that contain xylitol, as they can be toxic to cats.
          </li>
          <li>
            Monitor your cat's weight and adjust its diet as needed to prevent
            obesity or malnutrition.
          </li>
        </ul>
      </section>

      <section className="care-section">
        <h3>Grooming:</h3>
        <p>
          Regular grooming is essential to keep your cat clean and healthy. It
          also provides an opportunity to check for any signs of skin issues,
          parasites, or injuries. The grooming needs of your cat will depend on
          its breed, coat type, and activity level.
        </p>
        <ul>
          <li>
            Brush your cat's coat regularly to remove loose hair and prevent
            matting.
          </li>
          <li>
            Trim your cat's nails to keep them at a comfortable length and
            prevent overgrowth.
          </li>
          <li>
            Clean your cat's ears and teeth to prevent infections and dental
            issues.
          </li>
        </ul>
      </section>

      <section className="care-section">
        <h3>Exercise:</h3>
        <p>
          Cats need regular physical activity to maintain their overall health
          and well-being. Exercise helps prevent obesity, promotes muscle
          strength, and provides mental stimulation. The amount and type of
          exercise your cat needs will depend on its breed, age, and health
          status.
        </p>
        <ul>
          <li>
            Provide your cat with interactive toys and playtime to keep it
            mentally and physically engaged.
          </li>
          <li>
            Consider using puzzle feeders or food-dispensing toys to encourage
            your cat to be active and mentally stimulated.
          </li>
          <li>
            Set up a cat tree or climbing shelves to provide your cat with
            opportunities for climbing and exploration.
          </li>
        </ul>
      </section>

      <div className="source">
        <p>
          Source:{" "}
          <a
            href="https://icatcare.org/advice/thinking-of-getting-a-cat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            International Cat Care
          </a>
        </p>
      </div>
    </div>
  );
};

export default CatCare;
