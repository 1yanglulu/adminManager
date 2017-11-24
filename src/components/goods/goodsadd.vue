<template>
    <div class="tmpl">
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <span>返回上一层</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>新增商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="operation">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span='18'>
                        <el-form-item label="内容标题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="副标题" prop="sub_title">
                            <el-input v-model="ruleForm.sub_title"></el-input>
                        </el-form-item>
                        <el-form-item label="所属类别" prop='category_id'>
                            <el-select v-model="ruleForm.category_id" placeholder="请选择">
                                <el-option v-for="item in catelist" :label="item.title" :value="item.category_id">
                                    <span v-for='sub in (item.class_layer-1)'>&nbsp;</span>
                                    <span v-if='item.class_layer>1'>|-</span>
                                    {{item.title}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否发布">
                            <el-switch v-model="ruleForm.status" :width='62' on-color="#13ce66" off-color="#ff4949" on-text="ON" off-text="OFF">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="推荐类型">
                            <el-switch v-model="ruleForm.is_slide" :width='62' on-color="#13ce66" off-color="#ff4949" on-text="轮播图" off-text="轮播图">
                            </el-switch>
                            <el-switch v-model="ruleForm.is_top" :width='62' on-color="#13ce66" off-color="#ff4949" on-text="置顶" off-text="置顶">
                            </el-switch>
                            <el-switch v-model="ruleForm.is_hot" :width='62' on-color="#13ce66" off-color="#ff4949" on-text="推荐" off-text="推荐">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="上传封面">
                            <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" list-type="picture"
                                :on-success='imgUploaded'>
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="图片相册">
                            <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadfile" :file-list="ruleForm.fileList" list-type="picture"
                                :on-success='fileUploaded'>
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="商品货号" prop="goods_no">
                            <el-input v-model="ruleForm.goods_no"></el-input>
                        </el-form-item>
                        <el-form-item label="库存数量" prop="stock_quantity">
                            <el-input v-model="ruleForm.stock_quantity"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价格" prop="market_price">
                            <el-input v-model="ruleForm.market_price"></el-input>
                        </el-form-item>
                        <el-form-item label="销售价格" prop="sell_price">
                            <el-input v-model="ruleForm.sell_price"></el-input>
                        </el-form-item>
                        <el-form-item label="内容摘要" prop="zhaiyao">
                            <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
                        </el-form-item>
                        <el-form-item label="详细内容" prop="content">
                            <!-- :options="editorOption"下面的注册时间内容是空的，所以可以不要 -->
                            <quill-editor :content="ruleForm.content" @change="onEditorChange($event)">
                            </quill-editor>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </div>
    </div>
</template>

<script>
    //引入富文本编辑器
    import { quillEditor } from 'vue-quill-editor';

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                catelist: '',
                ruleForm: {
                    "title": "1",
                    "sub_title": "2",
                    "goods_no": "NZ0000000002",
                    category_id: 43,// 小问题：category_id要是一个数值类型，如果变成字符串类型的话，则页面显示不正常
                    "stock_quantity": 200,
                    "market_price": 1000,
                    "sell_price": 800,
                    "status": true,
                    "is_slide": true,
                    "is_top": false,
                    "is_hot": true,
                    "zhaiyao": "为不凡而生",
                    "content": "<p><strong>产品参数：</strong></p>",
                    "imgList": [
                        // {
                        //     "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        //     "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        //     "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
                        // }
                    ],
                    "fileList": [
                        // {
                        //     "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        //     "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        //     "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
                        // }
                    ]
                },
                rules: {
                    title: [
                        { required: true, message: '请输入商品标题', trigger: 'blur' },
                    ],
                    zhaiyao: [
                        { required: true, message: '', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            // 5.0 定义一个方法imgUploaded（当服务器成功响应以后回调）
            imgUploaded(responese, file, filelist) {
                // 经过查看对比，responese就是一个和imgList数组中的对象格式一致的对象，所以只需要将这个对象使用[responese]
                //    console.log(responese);
                this.ruleForm.imgList = [responese];
            },
            // 6.0 fileUplaoded 相册上传成功以后的回调
            fileUploaded(responese, file, filelist) {
                // 将responese通过 this.ruleForm.fileList.push(responese);才能保证多张图片
                this.ruleForm.fileList.push(responese);
            },
            submitForm(ruleForm) {
                // console.log(this.ruleForm);
                // console.log(this.$refs);
                this.$refs[ruleForm].validate((valid) => {
                    // valid:返回true的话，表示表单元素全部合法，否则不合法
                    if (valid) {
                        // 表示整个表单验证成功，应该将数据提交给服务器,完成新增工作
                        this.$ajax.post('/admin/goods/add/goods', this.ruleForm)
                            .then(res => {
                                if(res.data.status==1){
                                    this.$message({
                                    showClose: true,//是否关闭按钮
                                    message: res.data.message,// 消息文字
                                    type: 'error',
                                    duration: 1000//显示时间, 毫秒。设为 0 则不会自动关闭
                                });     
                                }else{
                                     // 跳转到列表页面
                                    // this.$route : 代表接收路由对象，可以通过 this.$route.parmas获取参数
                                    // this.$router：代表路由对象在vue上的一个原型对象可以调用他的push()方法完成页面的跳转
                                    console.log(11111)
                                    this.$router.push({name:'goodslist'})    
                                }
                                // Element 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 Message。
                               
                            });
                    } else {
                        console.log('error submit!!');
                        return false; 
                    }
                });
            },
            resetForm(ruleForm) {
                this.$refs[ruleForm].resetFields();
            },
            //获取频道分类数据
            getcatelist() {
                var url = '/admin/category/getlist/goods';
                //发出ajax请求
                this.$ajax.get(url).then(res => {
                    //  console.log(res);
                    // {category_id: 40, title: "手机数码", sort_id: 1000, class_layer: 1, parent_id: 0}
                    this.catelist = res.data.message;
                })
            },
            onEditorChange(ev) {
                // console.log(ev)
                this.ruleForm.content = ev.html
            }
        },
        mounted() {
            this.getcatelist();
        }
    }
</script>
<style scoped>
</style>