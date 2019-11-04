<template>
    <div class="table-content">
         <!--工具栏-->
         <div class="table-tool">
             <el-col :span="24" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" >
                   <el-button style="border:none;color:#000;background: #FFF; cursor: auto;">姓名:</el-button>
                    <el-form-item style="margin-right:40px; margin-left:-14px;">
                        <el-input v-model="filters.name" placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-button style="border:none;color:#000; background: #FFF; cursor: auto;">账号状态:</el-button>
                    <el-form-item style="margin-right:40px; margin-left:-14px;">
                       <el-select v-model="filters.system" placeholder="-请选择-">
                            <el-option label="启用" value="qiyong"></el-option>
                            <el-option label="未启用" value="weiqiyong"></el-option>
                      </el-select>
                    </el-form-item>

                     <el-button style="border:none;color:#000; background: #FFF; cursor: auto;">在职状态:</el-button>
                    <el-form-item style="margin-left:-14px;">
                       <el-select v-model="filters.zaizhi" placeholder="-请选择-">
                            <el-option label="在职" value="zaizhi"></el-option>
                            <el-option label="离职" value="lizhi"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" v-on:click="getUsers" style=" height: 35px; line-height:0;">查询</el-button>
                    </el-form-item>
                </el-form>
		    </el-col>

         </div>
         <!--列表-->
         <div class="table-lb">
              <div class="xz"><el-button type="primary" plain class="bt-xz" @click="handleAdd">新增</el-button></div>
             <el-table :data="users" border :header-cell-style="tableHeaderColor"  :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" style="width:100%; border:1px solid #DDDDDD;" max-height="550">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" label="序号" width="160">
                </el-table-column>
                 <el-table-column type="index" label="工号" width="160">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="160">
                </el-table-column>
                <el-table-column prop="id" label="登录ID" width="160">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="160" :formatter="formatSex">
                </el-table-column>
                <el-table-column prop="zaizhi" label="在职状态" width="160">
                </el-table-column>
               <el-table-column prop="system" label="账号状态" width="160">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="80" >
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-edit" style="color:#09f;margin-right:6px;" @click="handleEdit(scope.$index, scope.row)"></i>
                        <i class="el-icon-delete" style="color:#09f; margin-left:6px;" @click="handleDel(scope.$index, scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <div class="page-box" ref="page-box">
            <el-pagination class="pages"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5,10,20]"
                :page-size="size" 
                background
                layout="total,sizes,prev,pager,next"
                :total="total"
            ></el-pagination>
            </div>
         </div>

         <!--编辑界面-->
           <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" :visible.sync="editFormVisible">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="工号" prop="index">
					<el-input v-model="editForm.index" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登录ID" prop="id">
					<el-input v-model="editForm.id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="在职状态" prop="zaizhi">
                    <el-select v-model="editForm.zaizhi" placeholder="-请选择-">
                    <el-option label="在职" value="在职"></el-option>
                    <el-option label="离职" value="离职"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态" prop="system">
                    <el-select v-model="editForm.system" placeholder="-请选择-">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="未启用" value="未启用"></el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input  v-model="editForm.phone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				 <el-form-item label="工号" prop="index">
					<el-input v-model="addForm.index" auto-complete="off" placeholder="请输入工号"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
				</el-form-item>
                <el-form-item label="登录ID">
					<el-input v-model="addForm.id" auto-complete="off" placeholder="登录ID"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="在职状态">
                    <el-select v-model="addForm.zaizhi" placeholder="-请选择-">
                    <el-option label="在职" value="在职"></el-option>
                    <el-option label="离职" value="离职"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态" prop="system">
                    <el-select v-model="addForm.system" placeholder="-请选择-">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="未启用" value="未启用"></el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="手机号">
					<el-input  v-model="addForm.phone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                page:1,
                size:5,
                total:20,
                filters:{ //查询
                    name:'',
                    system:'',
                    zaizhi:''
                },
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
					name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    system:[ { required: true, message: '请输入账号状态', trigger: 'blur' }]
                },
                //编辑界面数据
				editForm: {
					id: 0,
					name: '',
                    sex: -1,
                    system:'',
                    zaizhi:'',
					phone: ''
                },
                addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    system:[ { required: true, message: '请输入账号状态', trigger: 'blur' }]
                },
                //新增界面数据
				addForm: {
					id: '',
					name: '',
                    sex: -1,
                    system:'',
                    zaizhi:'',
					phone: ''
				},

                //列表
                users:[
                    {
          
                        name: '王小虎',
                        phone: 123
                        }, {
                        name: '王小虎',
                            phone: 123
                        }, {
                        name: '王小虎',
                        phone: 123
                        }, {
                        name: '王小虎',
                            phone: 123
                        }, {
                        name: '王小虎',
                        phone: 123
                        }, {
                        name: '王小虎',
                        phone: 123
                        }, {
                        name: '王小虎',
                        phone: 123
                        }
                        , {
                        name: '王小虎',
                        phone: 123
                        }
                ],
                listLoading:false,//列表
            }
        },
        methods: {
            //性别显示转换
			formatSex (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
            tableRowClassName({row, rowIndex}) {
            if(rowIndex%2==1){
                return 'warning-row';
            }else{
                return 'success-row';
            }
            },
           tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #F9F9F9;font-weight:600;font-size:16px;text-align:center; color:#000;'
                }else if(rowIndex === 1){
                    return 'background-color: #f7faff;font-size:16px;text-align:center'
                }else if(rowIndex === 2){
                    return 'background-color: #f7faff;font-size:16px;text-align:center'
                }
                },

                handleSizeChange(val){
                    this.size=val;
                    this.page=1;
                    this.getUsers();
                },
                handleCurrentChange(val){
                    this.page=val;
                    this.getUsers();
                },

                //显示编辑界面
		        handleEdit(index, row) {
                    console.log(index,row);
                    this.editFormVisible = true;
                    this.editForm = Object.assign({}, row);
                },
                    
                //编辑
                editSubmit () {
                    this.$refs.editForm.validate((valid) => {
                        if (valid) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                this.editLoading = true;
                                // let para = Object.assign({}, this.editForm);
                                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                                // editUser(para).then((res) => {
                                // 	this.editLoading = false;
                                // 	this.$message({
                                // 		message: '提交成功',
                                // 		type: 'success'
                                // 	});
                                // 	this.$refs['editForm'].resetFields();
                                // 	this.editFormVisible = false;
                                // 	this.getUsers();
                                // });
                            });
                        }
                    });
                },

                //显示新增界面
                handleAdd() {
                    this.addFormVisible = true;
                    this.addForm = {
                        id: '',
                        name: '',
                        sex: -1,
                        system:'',
                        zaizhi:'',
                        phone: ''
                        };
                },

                //新增
                addSubmit(){
                    this.$refs.addForm.validate((valid) => {
                        if (valid) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                this.addLoading = true;
                                // let para = Object.assign({}, this.addForm);
                                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                                // addUser(para).then((res) => {
                                //     this.addLoading = false;
                                //     this.$message({
                                //         message: '提交成功',
                                //         type: 'success'
                                //     });
                                //     this.$refs['addForm'].resetFields();
                                //     this.addFormVisible = false;
                                //     this.getUsers();
                                // });
                            });
                        }
                    });
                },
               //删除
                handleDel(index, row) {
                    this.$confirm('确认删除该记录吗?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { id: row.id };
                        removeUser(para).then((res) => {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getUsers();
                        });
                    }).catch(() => {

                    });
                },
               //获取列表
                getUsers(){
                    let para={
                        name:this.filters.name,
                        system:this.filters,system,
                        zaizhi:this.filters.zaizhi
                    };

                }
        },
    }
</script>

<style scoped>
   .table-content{
      color: initial;
   }
   .table-tool{
       height: 80px;
       border: 1px solid #dddddd;
       box-shadow: 0 0 25px #cac6c6;
       margin-left:15px;
       margin-right: 15px;
       background: rgb(255, 255, 255);
       margin-bottom:20px;
   }
   .xz{
       height: 50px;
       background: rgb(255, 255, 255);
       border: 1px solid #DDDDDD;
   }
   .el-button--primary.is-plain {
    color: #409EFF;
    background: rgb(255, 255, 255);
    border-color: #b3d8ff;
}
   .bt-xz{
       line-height: 0.5;
       padding: 12px 14px;
       margin-top:8px;
       margin-left: 20px;
  }
   .el-form{
       margin-top:20px;
       margin-left:30px;
    }
   .table-lb{
       /* border: 1px solid #eaeaea;
       box-shadow: 0 0 25px #cac6c6; */
       margin-left:15px;
       margin-right:15px;
   }
   .el-table{
     height:700px;  
     /* margin-left:14px;
     margin-right:10px; */
   }
   
   .el-table .cell{
       text-align: center;
       font-size:14px;
   }
   .el-table .warning-row{
       background:#F9F9F9;
       font-weight:600;
   }
   i{
       cursor: pointer;
   }
   .pages{
       float: right;
       margin-top:24px;

   }
   .page-box{
       height: 80px;
       background: #fff;
       border: 1px solid #DDDDDD;
   }

   .el-input__inner {
    cursor: pointer;
    height: 34px;
    width: 166px;
   }
</style>

<style>
.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  
    text-align: center;
}
</style>