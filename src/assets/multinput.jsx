import '../css/style.css';
import React, { useState, useCallback } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';

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

export function InputFilter() {

    const [cpfOn, setCpfOn] = useState(false)
    const [cnpjOn, setCnpjOn] = useState(false)
    const [phoneOn, setPhoneOn] = useState(false)
    const [emailOn, setEmailOn] = useState(false)
    const [tipo, setTipo] = useState("text")
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();

    function SetFalse() {
        setCnpjOn(false)
        setPhoneOn(false)
        setEmailOn(false)
        setCpfOn(false)
    }

    const onGenderChange = (value) => {
        switch (value) {
            case 'Email':
                setTipo("email")
                SetFalse()
                setEmailOn(!emailOn)
                return;

            case 'CNPJ':
                setTipo("text")
                SetFalse()
                setCnpjOn(!cnpjOn)
                return;

            case 'Phone':
                setTipo("text")
                SetFalse()
                setPhoneOn(!phoneOn)
                return;

            case 'CPF':
                setTipo("text")
                SetFalse()
                setCpfOn(!cpfOn)
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
        e.currentTarget.maxLength = 15;
        let value = e.currentTarget.value;
        value = value.replace(/^(\d{0})(\d{2})(\d{5})(\d{4})/, "$1($2) $3.$4")
        e.currentTarget.value = value;
    }, [])

    return (
        <>
            <div className='bottom'>
                <Form className='form' {...layout} form={form} name="control-hooks">

                    <Form.Item
                        name="gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Login Option"
                            onChange={onGenderChange}
                            allowClear
                            className='select'
                        >
                            <Option value="Email">Email</Option>
                            <Option value="CNPJ">CNPJ</Option>
                            <Option value="Phone">Phone</Option>
                            <Option value="CPF">CPF</Option>
                        </Select>
                    </Form.Item>

                    <Input type={tipo} value={cpf} onKeyUp={handleKeyUpCpf} placeholder="999.999.999-99"
                        onChange={(event) => setCpf(event.target.value)} className={`input ${cpfOn === true && 'active'}`} />

                    <Input type={tipo} value={cnpj} onKeyUp={handleKeyUpCnpj} placeholder="99-999-999/9999-99"
                        onChange={(event) => setCnpj(event.target.value)} className={`input ${cnpjOn === true && 'active'}`} />

                    <Input type={tipo} value={tel} onKeyUp={handleKeyUpTel} placeholder="(99) 99999-9999"
                        onChange={(event) => setTel(event.target.value)} className={`input ${phoneOn === true && 'active'}`} />

                    <Input type={tipo} value={email} placeholder="example@gmail.com"
                        onChange={(event) => setEmail(event.target.value)} className={`input ${emailOn === true && 'active'}`} />


                    <a className="login-form-forgot" href="#">
                        Esqueci minha senha
                    </a>

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
