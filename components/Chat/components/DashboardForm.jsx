import React, { useState, useEffect } from 'react';
import Modal from "../../components/Modal";
import { addToDashboard } from "../hooks/dashboard";
import { useChatStore } from "../../store/chatStore";
import { useShallow } from 'zustand/react/shallow'
import { useAppStore } from "../../store/appStore";
import SelectConfig from "./SelectConfig";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-javascript'; // assuming ShopifyQL can use JavaScript syntax highlighting
import 'ace-builds/src-noconflict/theme-github';

export default function DashboardForm({setPopup, merchant_details}) {
    const { dashboardItems, setDashboardItems } = useChatStore()
    const { configs, configId,  } = useAppStore(useShallow(state => ({
        configId: state.configId,
        configs: state.configs,
      })));
    const [modal, setModal] = useState(false)
    const [formState, setFormState] = useState({
        loading: false,
        error: false,
        form: {
            language: 'sql',
            code: 'SELECT \n  (SELECT COUNT(*) FROM merchants_table) AS number_of_merchants,\n  (SELECT COUNT(*) FROM users_table) AS number_of_users'
        }}
    );
    const { form } = formState

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            form: {
                ...prev.form,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(configId) {
            setFormState(prev => ({
                ...prev,
                loading: true
            }));
            //console.log(form);
            addToDashboard(
                { 
                  merchant_details, 
                  raw_queries: [{
                    code_object: {
                        type: form.language,
                        code: form.code
                    }, 
                    result_table_as_json: null
                    }],
                    configuration: configs?.find(item => item.configuration.data_config_id === configId)?.configuration,
            })
            .then(result => {
                if(result.success) {
                    console.log(result)
                    setDashboardItems({
                        ...dashboardItems,
                        items: [...dashboardItems.items, result]
                    })
                    setPopup(false)
                }
            })
            .catch(e => {console.log(e)
                setFormState(prev => ({
                    ...prev,
                    error: true
                }))
            })
            .finally(() => {
                setFormState(prev => ({
                    ...prev,
                    loading: false
                }));
            })
    
        }
        else {
            setModal(true)
        }
        
    };

    const handleKeyDown = (e) => {
        
        if (e.key === 'Enter') {
          e.preventDefault();
          
          setFormState(prev => ({
            ...prev,
            form: {
                ...form,
                code: form.code + '\n'
            }
        }));
        }
      };

      useEffect(()=> {
        console.log(form)
      }, [form] )

    useEffect(() => {
        formState.error && setTimeout(() => {
          setFormState(prev => ({...prev, error: false}))
        }, 2000);
      }, [formState.error])

    return (
        <>
            {
             formState.error &&
                <div className="fixed capitalize top-[15%] shadow-[0px_0px_12px_rgba(0,0,0,0.1)] left-1/2 -translate-y-1/2 z-[10000] -translate-x-1/2  bg-[#F7F7F7] w-fit mx-auto p-4 rounded-[6px]">
                    An Error Occured
                </div>
            }

            {modal && <SelectConfig setPopup={setModal} handleSubmit={handleSubmit}/>}

            <Modal closePopup={() => setPopup(false)}  >
                
                <form onSubmit={handleSubmit} className="flex flex-col p-8">
                        <p className="text-center text-2xl font-medium mb-3.5">Add to Dashboard</p>

                        <label className="font-medium mt-4" htmlFor='language'>
                            Language<span className="text-red-600 ml-1">*</span>
                        </label>
                        <select
                            required
                            value={form.language}
                            name="language"
                            id="language"
                            onChange={handleChange}
                            className="border mt-1 border-[#1C3C68] bg-transparent focus:border-[#2886ff] focus:outline-none border-opacity-50 p-2 rounded-md"
                        >
                            <option value="sql">SQL</option>
                            <option value="python">Python</option>
                            <option value="shopifyql">ShopifyQL</option>
                        </select>

                        <label className="font-medium mt-4" htmlFor='code'>
                            Code<span className="text-red-600 ml-1">*</span>
                        </label>
                        <div className="relative mt-1 h-[200px]">
                           
                            <SyntaxHighlighter
                            language={form.language}
                            style={atomOneLight}
                            className="absolute top-0 left-0 w-full !bg-[#eef0f2] h-full p-2 flex-wrap box-border pointer-events-none  [&>*]:!whitespace-pre-wrap break-words"
                            >
                            {form.code}
                            </SyntaxHighlighter> 

                            <textarea
                            onKeyDown={handleKeyDown}
                            required
                            name="code"
                            id="code"
                            value={form.code}
                            onChange={handleChange}
                            className="relative w-full h-full bg-transparent text-transparent overflow-hidden caret-black border border-[#1C3C68] focus:border-[#2886ff] overflow-hidden focus:outline-none border-opacity-50 p-2 rounded-md resize-none z-10"
                            placeholder="Put your code object here"
                            ></textarea>
                        </div>
                        


                        <button disabled={formState.loading} className="bg-[#2886ff] mt-5 text-white p-2 rounded-md" type="submit">
                            {formState.loading ? 'Loading...' : 'Save and Execute'}
                        </button>
                </form>
                {/* <form onSubmit={handleSubmit} className="flex flex-col p-8">
                    <p className="text-center text-2xl font-medium mb-3.5">Add to Dashboard</p>

                    <label className="font-medium mt-4" htmlFor='language'>
                        Language<span className="text-red-600 ml-1">*</span>
                    </label>
                    <select
                        required
                        value={form.language}
                        name="language"
                        id="language"
                        onChange={handleChange}
                        className="border mt-1 border-[#1C3C68] bg-transparent focus:border-[#2886ff] focus:outline-none border-opacity-50 p-2 rounded-md"
                    >
                        <option value="sql">SQL</option>
                        <option value="python">Python</option>
                        <option value="shopifyql">ShopifyQL</option>
                    </select>

                    <label className="font-medium mt-4" htmlFor='code'>
                        Code<span className="text-red-600 ml-1">*</span>
                    </label>
                    <div className="relative mt-1 h-[200px]">
                        <AceEditor
                            mode={form.language === 'shopifyql' ? 'javascript' : form.language}
                            theme="github"
                            name="code"
                            onChange={(newValue) => handleChange({ target: { name: 'code', value: newValue } })}
                            value={form.code}
                            fontSize={14}
                            editorProps={{ $blockScrolling: true }}
                            className=""
                            setOptions={{
                                useWorker: false,
                                showLineNumbers: false,
                                tabSize: 2,
                            }}
                        />
                    </div>

                    <button disabled={formState.loading} className="bg-[#2886ff] mt-5 text-white p-2 rounded-md" type="submit">
                        {formState.loading ? 'Loading...' : 'Save and Execute'}
                    </button>
                </form> */}
            </Modal>
        </>   
    );
}
