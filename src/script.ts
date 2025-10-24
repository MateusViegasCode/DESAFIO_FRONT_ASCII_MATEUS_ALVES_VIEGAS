document.addEventListener('DOMContentLoaded', () => {

    // Rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Envio do formulário
    // Envio do formulário
    const form = document.getElementById('contact-form') as HTMLFormElement;

    // SÓ EXECUTA O CÓDIGO DO FORMULÁRIO SE O 'form' FOR ENCONTRADO
    if (form) {
        form.addEventListener('submit', (e: Event) => {
            e.preventDefault();

            // Coleta os dados do formulário
            const name = (document.getElementById('name') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const message = (document.getElementById('message') as HTMLTextAreaElement).value;

            // Ação (aqui, apenas um log)
            console.log('Formulário Enviado:', { name, email, message });
            alert('Obrigado pela sua mensagem!');

            form.reset(); // Limpa o formulário
        });
    }

    // Animações de rolagem para os cards (fade-in)
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5 // O card aparece quando 50% dele está visível
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

// --- DEFINIÇÃO DE TIPO PARA O ITEM DO CARRINHO ---
interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// --- FUNÇÕES GLOBAIS DO CARRINHO (NOSSO "BANCO DE DADOS") ---

/**
 * Pega o carrinho atual do localStorage.
 * @returns {CartItem[]} Um array de itens do carrinho.
 */
function getCart(): CartItem[] {
    const cartString = localStorage.getItem('ascii_cart');
    if (cartString) {
        return JSON.parse(cartString) as CartItem[];
    }
    return [];
}

/**
 * Salva o carrinho no localStorage.
 * @param {CartItem[]} cart - O array de itens do carrinho para salvar.
 */
function saveCart(cart: CartItem[]): void {
    localStorage.setItem('ascii_cart', JSON.stringify(cart));
    updateCartIcon(); // Atualiza o ícone sempre que o carrinho é salvo
}

/**
 * Adiciona um item ao carrinho.
 * @param {CartItem} itemToAdd - O item a ser adicionado.
 */
function addToCart(itemToAdd: CartItem): void {
    const cart = getCart();

    // Verifica se o item já existe
    const existingItem = cart.find(item => item.id === itemToAdd.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(itemToAdd);
    }

    saveCart(cart);
    alert(`${itemToAdd.name} foi adicionado ao carrinho!`);
}

/**
 * Remove um item do carrinho pelo ID.
 * @param {string} itemId - O ID do item a ser removido.
 */
function removeFromCart(itemId: string): void {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    loadCartPage(); // Recarrega os itens na página do carrinho
}

/**
 * Limpa o carrinho inteiro.
 */
function clearCart(): void {
    saveCart([]); // Salva um array vazio
    loadCartPage(); // Recarrega os itens
}

/**
 * Atualiza o contador de itens no ícone do carrinho no header.
 */
function updateCartIcon(): void {
    const cart = getCart();
    const cartCountElement = document.getElementById('cart-count');

    // Calcula a quantidade total de itens (não apenas tipos de produtos)
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.innerText = totalItems.toString();
    }
}

// --- LÓGICA DE INICIALIZAÇÃO DA PÁGINA ---

/**
 * Configura os botões "Adicionar ao Carrinho" na página da loja.
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
            addToCart(item);
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

    if (!container || !totalElement || !clearButton) return;

    const cart = getCart();

    // Limpa o container
    container.innerHTML = '';
    let totalValue = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            totalValue += item.price * item.quantity;

            // Cria o HTML para o item do carrinho
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
    clearButton.addEventListener('click', clearCart);

    // Adiciona listeners para todos os botões "Remover"
    document.querySelectorAll('.remove-from-cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            removeFromCart(btn.dataset.id!);
        });
    });
}

// --- SCRIPT PRINCIPAL QUE RODA QUANDO A PÁGINA CARREGA ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualiza o ícone do carrinho em TODAS as páginas
    updateCartIcon();

    // 2. Animações de rolagem (em TODAS as páginas)
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Reduzi para 10% para aparecer mais cedo
    });
    cards.forEach(card => {
        observer.observe(card);
    });

    // 3. Rolagem suave (em TODAS as páginas)
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

    // --- LÓGICA ESPEĆIFICA DE CADA PÁGINA ---

    // 4. Lógica do Formulário (SÓ RODA SE ACHAR O FORMULÁRIO)
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (form) {
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

    // 5. Lógica da Página da Loja (SÓ RODA SE ACHAR O GRID DE PRODUTOS)
    if (document.querySelector('.product-grid')) {
        initLojaPage();
    }

    // 6. Lógica da Página do Carrinho (SÓ RODA SE ACHAR O ID 'cart-page')
    if (document.getElementById('cart-page')) {
        loadCartPage();
    }

});