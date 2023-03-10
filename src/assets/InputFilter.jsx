import React, { useState, useCallback } from 'react';
import { Button, Form, Input, Select, Layout } from 'antd';
import "../css/style.css"
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const { Content } = Layout;

export function InputFilter() {

    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();
    
    const onGenderChange = (value) => {
    const emailInput = document.querySelector("#email");
    const cnpjInput = document.querySelector("#cnpj");
    const cpfInput = document.querySelector("#cpf");
    const phoneInput = document.querySelector("#tel");
        switch (value) {
            case 'Email':
                emailInput.classList.replace("false", "active");
                cpfInput.classList.replace("active", "false");
                cnpjInput.classList.replace("active", "false");
                phoneInput.classList.replace("active", "false");
                return;

            case 'CNPJ':
                emailInput.classList.replace("active", "false");
                cpfInput.classList.replace("active", "false");
                cnpjInput.classList.replace("false", "active");
                phoneInput.classList.replace("active", "false");
                return;

            case 'Telefone':
                emailInput.classList.replace("active", "false");
                cpfInput.classList.replace("active", "false");
                cnpjInput.classList.replace("active", "false");
                phoneInput.classList.replace("false", "active");
                return;

            case 'CPF':
                emailInput.classList.replace("active", "false");
                cpfInput.classList.replace("false", "active");
                cnpjInput.classList.replace("active", "false");
                phoneInput.classList.replace("active", "false");
                return;

            default:
        };
    }

    const handleKeyUpCpf = useCallback((e) => {
        e.currentTarget.maxLength = 11;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        e.currentTarget.value = value;
    }, [])

    const handleKeyUpCnpj = useCallback((e) => {
        e.currentTarget.maxLength = 14;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        e.currentTarget.value = value;
    }, [])

    const handleKeyUpTel = useCallback((e) => {
        e.currentTarget.maxLength = 11;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{0})(\d{2})(\d{5})(\d{4})/, "$1($2) $3.$4")
        e.currentTarget.value = value;
    }, [])

    return (
        <>
        <div className="bottom">
            <Form {...layout} form={form} name="control-hooks">

                <Form.Item
                    name="gender"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Selecione a opção de Login"
                        onChange={onGenderChange}
                        allowClear
                        className='select'
                    >
                        <Option value="Email">Email</Option>
                        <Option value="CNPJ">CNPJ</Option>
                        <Option value="Telefone">Telefone</Option>
                        <Option value="CPF">CPF</Option>
                    </Select>
                </Form.Item>

                <Input type="text" value={cpf} onKeyUp={handleKeyUpCpf} placeholder="999-999-999-99"
                    onChange={(event) => setCpf(event.target.value)} className={'input false'} id="cpf"
                />

                <Input type="text" value={cnpj} onKeyUp={handleKeyUpCnpj} placeholder="99-999-999/9999-99"
                    onChange={(event) => setCnpj(event.target.value)} className={'input false'} id="cnpj"
                />

                <Input type="text" value={tel} onKeyUp={handleKeyUpTel} placeholder="(99) 99999-9999"
                    onChange={(event) => setTel(event.target.value)} className={'input false'} id="tel" 
                />

                <Input type="email" value={email} placeholder="example@gmail.com"
                    onChange={(event) => setEmail(event.target.value)} className={'input false'} id="email"
                />

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </>
    )
}