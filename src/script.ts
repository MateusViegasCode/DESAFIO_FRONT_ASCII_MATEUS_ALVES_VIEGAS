interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

/**
 * Gerencia toda a lógica do carrinho de compras usando o localStorage.
 */
class Cart {
    private static CART_KEY = 'ascii_cart'; // Chave do localStorage

    /**
     * Pega o carrinho atual do localStorage.
     * @returns {CartItem[]} Um array de itens do carrinho.
     */
    public static get(): CartItem[] {
        const cartString = localStorage.getItem(this.CART_KEY);
        return cartString ? (JSON.parse(cartString) as CartItem[]) : [];
    }

    /**
     * Salva o carrinho no localStorage e atualiza o ícone.
     * @param {CartItem[]} cart - O array de itens do carrinho para salvar.
     */
    private static save(cart: CartItem[]): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
        this.updateIcon(); // Atualiza o ícone sempre que o carrinho é salvo
    }

    /**
     * Adiciona um item ao carrinho.
     * @param {CartItem} itemToAdd - O item a ser adicionado.
     */
    public static add(itemToAdd: CartItem): void {
        const cart = this.get();
        const existingItem = cart.find(item => item.id === itemToAdd.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(itemToAdd);
        }

        this.save(cart);
        alert(`${itemToAdd.name} foi adicionado ao carrinho!`);
    }

    /**
     * Remove um item do carrinho pelo ID.
     * @param {string} itemId - O ID do item a ser removido.
     */
    public static remove(itemId: string): void {
        let cart = this.get();
        cart = cart.filter(item => item.id !== itemId);
        this.save(cart);
    }

    /**
     * Limpa o carrinho inteiro.
     */
    public static clear(): void {
        this.save([]); // Salva um array vazio
    }

    /**
     * Atualiza o contador de itens no ícone do carrinho no header.
     */
    public static updateIcon(): void {
        const cart = this.get();
        const cartCountElement = document.getElementById('cart-count');

        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        if (cartCountElement) {
            cartCountElement.innerText = totalItems.toString();
        }
    }
}

/**
 * Inicializa os botões "Adicionar ao Carrinho" na página da loja.
 */
function initLojaPage(): void {
    const buttons = document.querySelectorAll('.add-to-cart-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            const item: CartItem = {
                id: btn.dataset.id!,
                name: btn.dataset.name!,
                price: parseFloat(btn.dataset.price!),
                image: btn.dataset.image!,
                quantity: 1
            };
            Cart.add(item); // Usa a classe Cart
        });
    });
}

/**
 * Carrega os itens e configura os botões na página do carrinho.
 */
function loadCartPage(): void {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    const clearButton = document.getElementById('clear-cart-button');

    // Se os elementos não existirem, esta não é a página do carrinho.
    if (!container || !totalElement || !clearButton) return;

    const cart = Cart.get(); // Usa a classe Cart
    container.innerHTML = ''; // Limpa o container
    let totalValue = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            totalValue += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name} (x${item.quantity})</h3>
                    <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="remove-from-cart-button" data-id="${item.id}">Remover</button>
            `;
            container.appendChild(itemElement);
        });
    }

    // Atualiza o total
    totalElement.innerText = `Total: R$ ${totalValue.toFixed(2)}`;

    // Adiciona listener para o botão de limpar
    clearButton.addEventListener('click', () => {
        Cart.clear(); // Usa a classe Cart
        loadCartPage(); // Recarrega a página para mostrar o carrinho vazio
    });

    // Adiciona listeners para todos os botões "Remover"
    document.querySelectorAll('.remove-from-cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            Cart.remove(btn.dataset.id!); // Usa a classe Cart
            loadCartPage(); // Recarrega a página para remover o item
        });
    });
}

/**
 * Inicializa o formulário de contato.
 */
function initContactForm(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return; // Só continua se o formulário existir

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const message = (document.getElementById('message') as HTMLTextAreaElement).value;

        console.log('Formulário Enviado:', { name, email, message });
        alert('Obrigado pela sua mensagem!');
        form.reset();
    });
}

/**
 * Inicializa as animações de "fade-in" para os cards.
 */
function initCardAnimations(): void {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Aparece quando 10% do card está visível
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * Inicializa a rolagem suave para links de âncora (ex: #contato).
 */
function initSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}


function main() {
    Cart.updateIcon();
    initSmoothScroll();
    initCardAnimations();
    const pageId = document.body.querySelector('main > section')?.id || '';

    if (document.getElementById('contact-form')) {
        initContactForm();
    }

    if (document.querySelector('.product-grid')) {
        initLojaPage();
    }

    if (pageId === 'cart-page') { // Se o ID da seção principal for 'cart-page'
        loadCartPage();
    }
}

document.addEventListener('DOMContentLoaded', main);