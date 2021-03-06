import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Plus, Heart, HeartFill } from 'react-bootstrap-icons';
import styles from './ProductItem.module.css'
import { addToCart, removeFromCart } from '../../store/actions/cartAction';
import { addToWishlist, removeFromWishlist } from '../../store/actions/wishlistAction';
import MiniLoader from '../Loader/MiniLoader';

const ProductItem = ({ product }) => {
    const { wishlist, cart } = useSelector(state => state);
    const dispatch = useDispatch();
    const id = !product.productId ? product.id : product.productId;

    const handleAddToWishlist = () => {
        dispatch(addToWishlist(id));
    }

    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(id));
    }

    const handleAddToCart = () => {
        dispatch(addToCart(id));
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    }

    return (
        <div className='col-3 mt-20 mb-20'>
            <article className={styles.product_item}>
                {product.isPending
                    ? <div className={styles.mini_loader}><MiniLoader size={18} /></div>
                    : !wishlist.items.some(item => item.productId === (!product.productId ? product.id : product.productId))
                        ? <button className={styles.add_to_wishlist} title='Add to Wishlist' onClick={handleAddToWishlist}><Heart size={20} /></button>
                        : <button className={styles.remove_from_wishlist} title='Remove from Wishlist' onClick={handleRemoveFromWishlist}><HeartFill size={20} /></button>}
                <img src={`./img/${product.image}`} alt="logo" />
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.product_item_footer}>
                    <span className={styles.price}>${product.price}</span>
                    {product.isPending
                        ? <MiniLoader size={32} />
                        : !cart.items.some(item => item.productId === (!product.productId ? product.id : product.productId))
                            ? <button className={styles.add_to_cart} title='Add to Cart' onClick={handleAddToCart}><Plus size={28} /></button>
                            : <button className={styles.remove_from_cart} title='Remove from Cart' onClick={handleRemoveFromCart}><Check size={28} /></button>}
                </div>
            </article>
        </div>
    );
};

export default ProductItem;
