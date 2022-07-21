measurement = {
    1 : 'пара',
    2 : 'шт.',
    3 : 'кг.',
}


catalog = {
    1 : {
        'id' : 1,
        'name': 'ботинки',
        'description': 'обувь',
        'sizes' : {
            '37' : {
                'measurement_id' : 1,
                'price' : 2000,
                'available' : 25,
            },
            '39' : {
                'measurement_id' : 1,
                'price' : 2500,
                'available' : 33,
            },   
            '40' : {
                'measurement_id' : 1,
                'price' : 1500,
                'available' : 5,
            },      
        },
    },
    2 : {
        'id' : 2,
        'name': 'туфли',
        'description': 'обувь',
        'sizes' : {
            '42' : {
                'measurement_id' : 1,
                'price' : 1950,
                'available' : 1,
            },
            '43' : {
                'measurement_id' : 1,
                'price' : 1800,
                'available' : 0,
            },   
            '45' : {
                'measurement_id' : 1,
                'price' : 1500,
                'available' : 1,
            },      
        },
    },
    3 : {
        'id' : 3,
        'name': 'рубашка',
        'description': 'одежда',
        'sizes' : {
            'L' : {
                'measurement_id' : 3,
                'price' : 850,
                'available' : 2,
            },
            'XL' : {
                'measurement_id' : 3,
                'price' : 1500,
                'available' : 33,
            },   
            'XXL' : {
                'measurement_id' : 3,
                'price' : 1500,
                'available' : 27,
            },      
        },
    },
    4 : {
        'id' : 4,
        'name': 'сахар',
        'description': 'продукты',
        'sizes' : {
            'вес' : {
                'measurement_id' : 3,
                'price' : 65,
                'available' : 4765,
            },
            '0,95кг.' : {
                'measurement_id' : 2,
                'price' : 107,
                'available' : 74,
            },   
            '0,45кг.' : {
                'measurement_id' : 2,
                'price' : 65,
                'available' : 347,
            },      
        },
    },
    5 : {
        'id' : 5,
        'name': 'помидоры',
        'description': 'обувь',
        'sizes' : {
            'Россия' : {
                'measurement_id' : 3,
                'price' : 185,
                'available' : 97,
            },
            'на ветке' : {
                'measurement_id' : 3,
                'price' : 225,
                'available' : 118,
            },   
            'чери' : {
                'measurement_id' : 3,
                'price' : 325,
                'available' : 62,
            },      
        },
    },
}

basket = [
    {
        'product_id' : 1,
        'size' : '37',
        'count' : 10,
    },
    {
        'product_id' : 2,
        'size' : '43',
        'count' : 1,
    },
]

function checkingProductBasket(productId, size) {
    if (!(productId in catalog)) {
        console.log('ОШИБКА!!! Продукта с ID', productId, 'в каталоге не найдено' );
        return false;
    };
    if (!(size in catalog[productId]['sizes'])) {
        console.log('ОШИБКА!!! Продукта ID', productId, '|', size, 'в каталоге не найдено' );
        return false;
    };
    return true;
};

function searchProductBasket(productId, size) {
    for (let i = 0; i<basket.length; i++){
        if (basket[i].product_id === productId && basket[i].size === size) {
            return i;
        };
    };
    return false;
};

function addProductBasket(productId, size, count) {
    if (!checkingProductBasket(productId, size)) {
        return false;
    };
    if (count === 0) {
        console.log('ОШИБКА!!! count = 0 добавить в карзину запрещено!');
        return false;
    }
    available = catalog[productId]['sizes'][size]['available']
    if (available === 0) {
        console.log('ОШИБКА!!! Товар закончился');
        return false;
    };
    let product = {}
    if (available >= count) {
        catalog[productId]['sizes'][size]['available'] = available - count;
        product = {'product_id': productId, 'size': size, 'count' : count};
    } else {
        catalog[productId]['sizes'][size]['available'] = 0;
        product = {'product_id': productId, 'size': size, 'count' : available};    
        console.log('Добавлено максимальное возможное количество товара');
    };
    let address = searchProductBasket(productId, size);
    if (Number.isInteger(address)) {
        basket[address].count += product.count
    } else {
        basket.push(product);
    };
    return product;
};

function deleteProductBasket(productId, size, count) {
    if (!checkingProductBasket(productId, size)) {
        return false;
    };
    if (count === 0) {
        console.log('ОШИБКА!!! count = 0 удалять из карзину запрещено!');
        return false;
    }
    let address = searchProductBasket(productId, size);
    if (!Number.isInteger(address)) {
        console.log('ОШИБКА!!! продукт в корзине не найден.')
        return false;
    }; 
    if (count > basket[address].count) {
        console.log('ОШИБКА!!! продукта в корзине меньше чем предложено удалить.');
        return false;
    };
    let productDelete = basket[address];
    if (productDelete.count === count) {
        basket.splice(address, 1);
    } else {
        basket[address].count -= count;
    };
    catalog[productDelete.product_id].sizes[productDelete.size].available += count;
    return productDelete;
};

function createBasket() {
    for (let i = basket.length - 1; i >= 0; i--){
        deleteProductBasket(basket[i].product_id, basket[i].size, basket[i].count);
    };
};

function result() {
    let totalAmount = basket.length
    let totalSumm = 0;
    for (let i = 0; i < totalAmount; i++){
        totalSumm += catalog[basket[i].product_id].sizes[basket[i].size].price * basket[i].count
    };
    return {'totalAmount': totalAmount, 'totalSumm': totalSumm};
};


addProductBasket(1, '37', 3);
addProductBasket(5, 'чери', 9);
addProductBasket(6, 'чери', 9);
addProductBasket(1, '42', 1);
addProductBasket(1, '37', 0);
addProductBasket(1, '37', 90);
console.log(result());
deleteProductBasket(6, 'чери', 7);
deleteProductBasket(1, '37', 200);
deleteProductBasket(1, '37', 20);
console.log(result());
createBasket();
console.log(result());