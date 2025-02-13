import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from '~/components/ui/Table/Table.vue'

describe('Table Component', () => {
    const defaultProps = {
        headers: [
            { key: 'name', label: 'Nome' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Função' },
            { key: 'avatar', label: 'Avatar' }
        ],
        items: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Admin',
                avatar: 'https://example.com/avatar1.jpg'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'User',
                avatar: 'https://example.com/avatar2.jpg'
            }
        ]
    }

    it('renders properly', () => {
        const wrapper = mount(Table, {
            props: defaultProps
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('renders all headers in desktop version', () => {
        const wrapper = mount(Table, {
            props: defaultProps
        })

        const headers = wrapper.findAll('th')
        expect(headers).toHaveLength(defaultProps.headers.length)

        defaultProps.headers.forEach((header, index) => {
            expect(headers[index].text()).toBe(header.label)
        })
    })

    it('renders all items in desktop version', () => {
        const wrapper = mount(Table, {
            props: defaultProps
        })

        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(defaultProps.items.length)
    })

    it('renders custom slot content', () => {
        const wrapper = mount(Table, {
            props: defaultProps,
            slots: {
                actions: '<button>Edit</button>'
            }
        })

        expect(wrapper.html()).toContain('Edit')
    })

    it('applies alternate background to even rows in desktop version', () => {
        const wrapper = mount(Table, {
            props: defaultProps
        })

        const rows = wrapper.findAll('tbody tr')
        expect(rows[1].classes()).toContain('hover:bg-gray-100')
    })

    it('renders avatar images correctly', () => {
        const wrapper = mount(Table, {
            props: defaultProps
        })

        const avatars = wrapper.findAll('img')

        avatars.forEach((avatar, index) => {

            expect(avatar.attributes('src')).toBeDefined()
            expect(avatar.attributes('alt')).toBeDefined()
        })
    })
    
    it('renders role as badge', () => {
        const wrapper = mount(Table, { props: defaultProps })
        
        const roleBadges = wrapper.findAll('.badge')
        
        roleBadges.forEach((badge, index) => {
            expect(badge.text()).toBeDefined()
        })
    })

    it('renders mobile version with correct structure', () => {
        const wrapper = mount(Table, {
            props: defaultProps
        })

        const mobileContainer = wrapper.find('.block.md\\:hidden')
        expect(mobileContainer.exists()).toBe(true)

        const mobileItems = mobileContainer.findAll('.bg-white')
        expect(mobileItems).toHaveLength(defaultProps.items.length)
    })
})