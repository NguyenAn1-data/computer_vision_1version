/**
 * PetVision AI - ImageNet Labels Mapping
 * Maps ImageNet class indices to dog/cat breed information
 * Source: ImageNet 1000 classes (ILSVRC)
 */

const PET_LABELS = {
  // ============================================
  // 🐱 CATS (ImageNet classes 281-287)
  // ============================================
  281: { type: 'cat', breed: 'Tabby Cat', breedVi: 'Mèo Tabby', icon: '🐱' },
  282: { type: 'cat', breed: 'Tiger Cat', breedVi: 'Mèo Vằn', icon: '🐱' },
  283: { type: 'cat', breed: 'Persian Cat', breedVi: 'Mèo Ba Tư', icon: '🐱' },
  284: { type: 'cat', breed: 'Siamese Cat', breedVi: 'Mèo Xiêm', icon: '🐱' },
  285: { type: 'cat', breed: 'Egyptian Cat', breedVi: 'Mèo Ai Cập', icon: '🐱' },
  286: { type: 'cat', breed: 'Cougar', breedVi: 'Báo Sư Tử', icon: '🐱' },
  287: { type: 'cat', breed: 'Lynx', breedVi: 'Mèo Rừng Lynx', icon: '🐱' },

  // ============================================
  // 🐶 DOGS (ImageNet classes 151-275)
  // ============================================
  151: { type: 'dog', breed: 'Chihuahua', breedVi: 'Chihuahua', icon: '🐶' },
  152: { type: 'dog', breed: 'Japanese Spaniel', breedVi: 'Chó Nhật Bản', icon: '🐶' },
  153: { type: 'dog', breed: 'Maltese', breedVi: 'Chó Maltese', icon: '🐶' },
  154: { type: 'dog', breed: 'Pekinese', breedVi: 'Chó Bắc Kinh', icon: '🐶' },
  155: { type: 'dog', breed: 'Shih-Tzu', breedVi: 'Chó Shih-Tzu', icon: '🐶' },
  156: { type: 'dog', breed: 'Blenheim Spaniel', breedVi: 'Chó Blenheim Spaniel', icon: '🐶' },
  157: { type: 'dog', breed: 'Papillon', breedVi: 'Chó Papillon', icon: '🐶' },
  158: { type: 'dog', breed: 'Toy Terrier', breedVi: 'Chó Toy Terrier', icon: '🐶' },
  159: { type: 'dog', breed: 'Rhodesian Ridgeback', breedVi: 'Chó Rhodesian Ridgeback', icon: '🐶' },
  160: { type: 'dog', breed: 'Afghan Hound', breedVi: 'Chó Săn Afghan', icon: '🐶' },
  161: { type: 'dog', breed: 'Basset Hound', breedVi: 'Chó Basset', icon: '🐶' },
  162: { type: 'dog', breed: 'Beagle', breedVi: 'Chó Beagle', icon: '🐶' },
  163: { type: 'dog', breed: 'Bloodhound', breedVi: 'Chó Bloodhound', icon: '🐶' },
  164: { type: 'dog', breed: 'Bluetick Coonhound', breedVi: 'Chó Bluetick', icon: '🐶' },
  165: { type: 'dog', breed: 'Black and Tan Coonhound', breedVi: 'Chó Coonhound Đen Nâu', icon: '🐶' },
  166: { type: 'dog', breed: 'Walker Foxhound', breedVi: 'Chó Walker Foxhound', icon: '🐶' },
  167: { type: 'dog', breed: 'English Foxhound', breedVi: 'Chó Foxhound Anh', icon: '🐶' },
  168: { type: 'dog', breed: 'Redbone Coonhound', breedVi: 'Chó Redbone', icon: '🐶' },
  169: { type: 'dog', breed: 'Borzoi', breedVi: 'Chó Borzoi', icon: '🐶' },
  170: { type: 'dog', breed: 'Irish Wolfhound', breedVi: 'Chó Sói Ireland', icon: '🐶' },
  171: { type: 'dog', breed: 'Italian Greyhound', breedVi: 'Chó Greyhound Ý', icon: '🐶' },
  172: { type: 'dog', breed: 'Whippet', breedVi: 'Chó Whippet', icon: '🐶' },
  173: { type: 'dog', breed: 'Ibizan Hound', breedVi: 'Chó Săn Ibizan', icon: '🐶' },
  174: { type: 'dog', breed: 'Norwegian Elkhound', breedVi: 'Chó Elkhound Na Uy', icon: '🐶' },
  175: { type: 'dog', breed: 'Otterhound', breedVi: 'Chó Otterhound', icon: '🐶' },
  176: { type: 'dog', breed: 'Saluki', breedVi: 'Chó Saluki', icon: '🐶' },
  177: { type: 'dog', breed: 'Scottish Deerhound', breedVi: 'Chó Săn Scotland', icon: '🐶' },
  178: { type: 'dog', breed: 'Weimaraner', breedVi: 'Chó Weimaraner', icon: '🐶' },
  179: { type: 'dog', breed: 'Staffordshire Bull Terrier', breedVi: 'Chó Staffordshire', icon: '🐶' },
  180: { type: 'dog', breed: 'American Staffordshire Terrier', breedVi: 'Chó Staffordshire Mỹ', icon: '🐶' },
  181: { type: 'dog', breed: 'Bedlington Terrier', breedVi: 'Chó Bedlington', icon: '🐶' },
  182: { type: 'dog', breed: 'Border Terrier', breedVi: 'Chó Border Terrier', icon: '🐶' },
  183: { type: 'dog', breed: 'Kerry Blue Terrier', breedVi: 'Chó Kerry Blue', icon: '🐶' },
  184: { type: 'dog', breed: 'Irish Terrier', breedVi: 'Chó Terrier Ireland', icon: '🐶' },
  185: { type: 'dog', breed: 'Norfolk Terrier', breedVi: 'Chó Norfolk Terrier', icon: '🐶' },
  186: { type: 'dog', breed: 'Norwich Terrier', breedVi: 'Chó Norwich Terrier', icon: '🐶' },
  187: { type: 'dog', breed: 'Yorkshire Terrier', breedVi: 'Chó Yorkshire', icon: '🐶' },
  188: { type: 'dog', breed: 'Wire Fox Terrier', breedVi: 'Chó Wire Fox Terrier', icon: '🐶' },
  189: { type: 'dog', breed: 'Lakeland Terrier', breedVi: 'Chó Lakeland Terrier', icon: '🐶' },
  190: { type: 'dog', breed: 'Sealyham Terrier', breedVi: 'Chó Sealyham', icon: '🐶' },
  191: { type: 'dog', breed: 'Airedale Terrier', breedVi: 'Chó Airedale', icon: '🐶' },
  192: { type: 'dog', breed: 'Cairn Terrier', breedVi: 'Chó Cairn Terrier', icon: '🐶' },
  193: { type: 'dog', breed: 'Australian Terrier', breedVi: 'Chó Terrier Úc', icon: '🐶' },
  194: { type: 'dog', breed: 'Dandie Dinmont Terrier', breedVi: 'Chó Dandie Dinmont', icon: '🐶' },
  195: { type: 'dog', breed: 'Boston Terrier', breedVi: 'Chó Boston Terrier', icon: '🐶' },
  196: { type: 'dog', breed: 'Miniature Schnauzer', breedVi: 'Chó Schnauzer Mini', icon: '🐶' },
  197: { type: 'dog', breed: 'Giant Schnauzer', breedVi: 'Chó Schnauzer Khổng Lồ', icon: '🐶' },
  198: { type: 'dog', breed: 'Standard Schnauzer', breedVi: 'Chó Schnauzer Tiêu Chuẩn', icon: '🐶' },
  199: { type: 'dog', breed: 'Scottish Terrier', breedVi: 'Chó Terrier Scotland', icon: '🐶' },
  200: { type: 'dog', breed: 'Tibetan Terrier', breedVi: 'Chó Terrier Tây Tạng', icon: '🐶' },
  201: { type: 'dog', breed: 'Australian Silky Terrier', breedVi: 'Chó Silky Terrier Úc', icon: '🐶' },
  202: { type: 'dog', breed: 'Soft-Coated Wheaten Terrier', breedVi: 'Chó Wheaten Terrier', icon: '🐶' },
  203: { type: 'dog', breed: 'West Highland White Terrier', breedVi: 'Chó Westie', icon: '🐶' },
  204: { type: 'dog', breed: 'Lhasa Apso', breedVi: 'Chó Lhasa Apso', icon: '🐶' },
  205: { type: 'dog', breed: 'Flat-Coated Retriever', breedVi: 'Chó Retriever Lông Phẳng', icon: '🐶' },
  206: { type: 'dog', breed: 'Curly-Coated Retriever', breedVi: 'Chó Retriever Lông Xoăn', icon: '🐶' },
  207: { type: 'dog', breed: 'Golden Retriever', breedVi: 'Chó Golden Retriever', icon: '🐶' },
  208: { type: 'dog', breed: 'Labrador Retriever', breedVi: 'Chó Labrador', icon: '🐶' },
  209: { type: 'dog', breed: 'Chesapeake Bay Retriever', breedVi: 'Chó Chesapeake', icon: '🐶' },
  210: { type: 'dog', breed: 'German Shorthaired Pointer', breedVi: 'Chó Pointer Đức', icon: '🐶' },
  211: { type: 'dog', breed: 'Vizsla', breedVi: 'Chó Vizsla', icon: '🐶' },
  212: { type: 'dog', breed: 'English Setter', breedVi: 'Chó Setter Anh', icon: '🐶' },
  213: { type: 'dog', breed: 'Irish Setter', breedVi: 'Chó Setter Ireland', icon: '🐶' },
  214: { type: 'dog', breed: 'Gordon Setter', breedVi: 'Chó Gordon Setter', icon: '🐶' },
  215: { type: 'dog', breed: 'Brittany Spaniel', breedVi: 'Chó Brittany Spaniel', icon: '🐶' },
  216: { type: 'dog', breed: 'Clumber Spaniel', breedVi: 'Chó Clumber Spaniel', icon: '🐶' },
  217: { type: 'dog', breed: 'English Springer Spaniel', breedVi: 'Chó Springer Anh', icon: '🐶' },
  218: { type: 'dog', breed: 'Welsh Springer Spaniel', breedVi: 'Chó Springer Wales', icon: '🐶' },
  219: { type: 'dog', breed: 'Cocker Spaniel', breedVi: 'Chó Cocker Spaniel', icon: '🐶' },
  220: { type: 'dog', breed: 'Sussex Spaniel', breedVi: 'Chó Sussex Spaniel', icon: '🐶' },
  221: { type: 'dog', breed: 'Irish Water Spaniel', breedVi: 'Chó Spaniel Nước Ireland', icon: '🐶' },
  222: { type: 'dog', breed: 'Kuvasz', breedVi: 'Chó Kuvasz', icon: '🐶' },
  223: { type: 'dog', breed: 'Schipperke', breedVi: 'Chó Schipperke', icon: '🐶' },
  224: { type: 'dog', breed: 'Groenendael', breedVi: 'Chó Chăn Cừu Bỉ', icon: '🐶' },
  225: { type: 'dog', breed: 'Malinois', breedVi: 'Chó Malinois', icon: '🐶' },
  226: { type: 'dog', breed: 'Briard', breedVi: 'Chó Briard', icon: '🐶' },
  227: { type: 'dog', breed: 'Australian Kelpie', breedVi: 'Chó Kelpie Úc', icon: '🐶' },
  228: { type: 'dog', breed: 'Komondor', breedVi: 'Chó Komondor', icon: '🐶' },
  229: { type: 'dog', breed: 'Old English Sheepdog', breedVi: 'Chó Chăn Cừu Anh', icon: '🐶' },
  230: { type: 'dog', breed: 'Shetland Sheepdog', breedVi: 'Chó Shetland', icon: '🐶' },
  231: { type: 'dog', breed: 'Collie', breedVi: 'Chó Collie', icon: '🐶' },
  232: { type: 'dog', breed: 'Border Collie', breedVi: 'Chó Border Collie', icon: '🐶' },
  233: { type: 'dog', breed: 'Bouvier des Flandres', breedVi: 'Chó Bouvier', icon: '🐶' },
  234: { type: 'dog', breed: 'Rottweiler', breedVi: 'Chó Rottweiler', icon: '🐶' },
  235: { type: 'dog', breed: 'German Shepherd', breedVi: 'Chó Becgie Đức', icon: '🐶' },
  236: { type: 'dog', breed: 'Doberman Pinscher', breedVi: 'Chó Doberman', icon: '🐶' },
  237: { type: 'dog', breed: 'Miniature Pinscher', breedVi: 'Chó Pinscher Mini', icon: '🐶' },
  238: { type: 'dog', breed: 'Greater Swiss Mountain Dog', breedVi: 'Chó Sơn Cước Thụy Sĩ', icon: '🐶' },
  239: { type: 'dog', breed: 'Bernese Mountain Dog', breedVi: 'Chó Bernese', icon: '🐶' },
  240: { type: 'dog', breed: 'Appenzeller Sennenhund', breedVi: 'Chó Appenzeller', icon: '🐶' },
  241: { type: 'dog', breed: 'Entlebucher Sennenhund', breedVi: 'Chó Entlebucher', icon: '🐶' },
  242: { type: 'dog', breed: 'Boxer', breedVi: 'Chó Boxer', icon: '🐶' },
  243: { type: 'dog', breed: 'Bull Mastiff', breedVi: 'Chó Bull Mastiff', icon: '🐶' },
  244: { type: 'dog', breed: 'Tibetan Mastiff', breedVi: 'Chó Ngao Tây Tạng', icon: '🐶' },
  245: { type: 'dog', breed: 'French Bulldog', breedVi: 'Chó Bull Pháp', icon: '🐶' },
  246: { type: 'dog', breed: 'Great Dane', breedVi: 'Chó Great Dane', icon: '🐶' },
  247: { type: 'dog', breed: 'Saint Bernard', breedVi: 'Chó Saint Bernard', icon: '🐶' },
  248: { type: 'dog', breed: 'Eskimo Dog', breedVi: 'Chó Eskimo', icon: '🐶' },
  249: { type: 'dog', breed: 'Malamute', breedVi: 'Chó Alaska Malamute', icon: '🐶' },
  250: { type: 'dog', breed: 'Siberian Husky', breedVi: 'Chó Husky Siberia', icon: '🐶' },
  251: { type: 'dog', breed: 'Dalmatian', breedVi: 'Chó Đốm Dalmatian', icon: '🐶' },
  252: { type: 'dog', breed: 'Affenpinscher', breedVi: 'Chó Affenpinscher', icon: '🐶' },
  253: { type: 'dog', breed: 'Basenji', breedVi: 'Chó Basenji', icon: '🐶' },
  254: { type: 'dog', breed: 'Pug', breedVi: 'Chó Pug', icon: '🐶' },
  255: { type: 'dog', breed: 'Leonberger', breedVi: 'Chó Leonberger', icon: '🐶' },
  256: { type: 'dog', breed: 'Newfoundland', breedVi: 'Chó Newfoundland', icon: '🐶' },
  257: { type: 'dog', breed: 'Great Pyrenees', breedVi: 'Chó Great Pyrenees', icon: '🐶' },
  258: { type: 'dog', breed: 'Samoyed', breedVi: 'Chó Samoyed', icon: '🐶' },
  259: { type: 'dog', breed: 'Pomeranian', breedVi: 'Chó Phốc Sóc', icon: '🐶' },
  260: { type: 'dog', breed: 'Chow Chow', breedVi: 'Chó Chow Chow', icon: '🐶' },
  261: { type: 'dog', breed: 'Keeshond', breedVi: 'Chó Keeshond', icon: '🐶' },
  262: { type: 'dog', breed: 'Brabancon Griffon', breedVi: 'Chó Griffon Bỉ', icon: '🐶' },
  263: { type: 'dog', breed: 'Pembroke Welsh Corgi', breedVi: 'Chó Corgi Pembroke', icon: '🐶' },
  264: { type: 'dog', breed: 'Cardigan Welsh Corgi', breedVi: 'Chó Corgi Cardigan', icon: '🐶' },
  265: { type: 'dog', breed: 'Toy Poodle', breedVi: 'Chó Poodle Toy', icon: '🐶' },
  266: { type: 'dog', breed: 'Miniature Poodle', breedVi: 'Chó Poodle Mini', icon: '🐶' },
  267: { type: 'dog', breed: 'Standard Poodle', breedVi: 'Chó Poodle Tiêu Chuẩn', icon: '🐶' },
  268: { type: 'dog', breed: 'Mexican Hairless', breedVi: 'Chó Không Lông Mexico', icon: '🐶' },
  269: { type: 'dog', breed: 'Timber Wolf', breedVi: 'Sói Gỗ', icon: '🐶' },
  270: { type: 'dog', breed: 'White Wolf', breedVi: 'Sói Trắng', icon: '🐶' },
  271: { type: 'dog', breed: 'Red Wolf', breedVi: 'Sói Đỏ', icon: '🐶' },
  272: { type: 'dog', breed: 'Coyote', breedVi: 'Sói Đồng Cỏ', icon: '🐶' },
  273: { type: 'dog', breed: 'Dingo', breedVi: 'Chó Dingo', icon: '🐶' },
  274: { type: 'dog', breed: 'Dhole', breedVi: 'Chó Sói Châu Á', icon: '🐶' },
  275: { type: 'dog', breed: 'African Hunting Dog', breedVi: 'Chó Săn Châu Phi', icon: '🐶' },
};

/**
 * Check if an ImageNet class index belongs to a dog or cat
 * @param {number} classIndex - ImageNet class index
 * @returns {object|null} - Pet info or null if not a pet
 */
function getPetInfo(classIndex) {
  return PET_LABELS[classIndex] || null;
}

/**
 * Check if a class name string contains dog/cat keywords
 * Used as fallback when MobileNet returns string labels
 * @param {string} className - The predicted class name
 * @returns {object|null}
 */
function getPetInfoByName(className) {
  const lowerName = className.toLowerCase();

  // Dog breed keywords
  const dogKeywords = [
    'terrier', 'hound', 'retriever', 'spaniel', 'setter', 'pointer',
    'sheepdog', 'shepherd', 'collie', 'poodle', 'bulldog', 'mastiff',
    'corgi', 'husky', 'malamute', 'dalmatian', 'pug', 'boxer',
    'rottweiler', 'doberman', 'pinscher', 'schnauzer', 'beagle',
    'chihuahua', 'maltese', 'pekinese', 'shih-tzu', 'papillon',
    'samoyed', 'pomeranian', 'chow', 'keeshond', 'basenji',
    'newfoundland', 'leonberger', 'komondor', 'briard', 'kuvasz',
    'malinois', 'vizsla', 'weimaraner', 'borzoi', 'whippet',
    'greyhound', 'wolfhound', 'deerhound', 'foxhound', 'ridgeback',
    'bloodhound', 'basset', 'coonhound', 'dingo', 'dhole',
    'african hunting dog', 'wolf', 'coyote'
  ];

  const catKeywords = [
    'tabby', 'tiger cat', 'persian cat', 'siamese cat', 'egyptian cat',
    'cougar', 'lynx', 'cat'
  ];

  // Check cats first (more specific matches)
  for (const keyword of catKeywords) {
    if (lowerName.includes(keyword)) {
      return { type: 'cat', breed: className, breedVi: className, icon: '🐱' };
    }
  }

  // Check dogs
  for (const keyword of dogKeywords) {
    if (lowerName.includes(keyword)) {
      return { type: 'dog', breed: className, breedVi: className, icon: '🐶' };
    }
  }

  return null;
}
