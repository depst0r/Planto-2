import '/src/sass/style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const filterBtn = document.querySelector('.filter__btn');
    const modal = document.querySelector('.modal');

    const isOpen = (btn, item, activeClass) => {
        document.querySelector(btn).addEventListener('click', () => {
            document.querySelector(item).classList.toggle(activeClass);
        })
    }

    document.getElementById('form')?.addEventListener('submit', e => {
        e.preventDefault();
    })

    const closeAllSelects = () => {
        document.querySelectorAll('.form__select--open').forEach(select => {
            select.classList.remove('form__select--open')
        })
    }

    const toggleSelect = select => {
        closeAllSelects();
        select.classList.toggle('form__select--open')
    }

    const selectOption = (select, option) => {
        const hiddenSelect = select.querySelector('.form__select-hidden')
        const selectedText = select.querySelector('.form__select-text')

        hiddenSelect.value = option.dataset.value;
        selectedText.textContent = option.textContent;

        select.querySelectorAll('.form__select-option--selected').forEach(opt => {
            opt.classList.remove('form__select-option--selected');
        })

        option.classList.add('form__select-option--selected')

        select.classList.remove('form__select--open')

        hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }))
    }

    document.querySelectorAll('.form__select-trigger').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.stopPropagation()
            const select = trigger.closest('.form__select')
            toggleSelect(select)
        })
    })

    document.querySelectorAll('.form__select-option').forEach(option => {
        option.addEventListener('click', e => {
            e.stopPropagation()
            const select = option.closest('.form__select')
            selectOption(select, option)
        })
    })

    document.addEventListener('click', e => {
        if (!e.target.closest('.form__select')) {
            closeAllSelects()
        }
    })

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeAllSelects()
        }
    })

    document.querySelectorAll('.form__select-hidden').forEach(select => {
        const value = select.value;
        const text = select.options[select.selectedIndex]?.text;
        const customSelect = select.closest('.form__select');

        if (customSelect && text) {
            customSelect.querySelector('.form__select-text').textContent = text;
            const option = customSelect.querySelector(`[data-value="${value}"]`);
            if (option) {
                option.classList.add('form__select-option--selected');
            }
        }
    })

    modalOverlay.style.display = 'none';


    const openModal = () => {
        modalOverlay.style.display = 'flex'
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        modalOverlay.style.display = 'none'
        document.body.style.overflow = ''
    }

    filterBtn?.addEventListener('click', openModal)
    closeBtn?.addEventListener('click', closeModal)

    modalOverlay?.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal()
    })

    modal?.addEventListener('click', e => e.stopPropagation())

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.modal-overlay').style.display = 'none';
    })

    isOpen('.search-icon', '.search', 'active')
    isOpen('.header__burger', '.burger-nav', 'burger-nav-active')
})
