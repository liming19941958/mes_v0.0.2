import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer'
import LoginPage from './components/tabbar/LoginContainer'
import HomePage from './components/home/home-contain'
import RoleManagementPage from './components/systemSetting/RoleManagement'
import organization from './components/systemSetting/UserManagement'//系统设置-用户管理
import userlog from './components/systemSetting/LogQuery'
import ExceptionLogPage from './components/systemSetting/ExceptionLog'
import TopologyManagementPage from './components/systemSetting/TopologyManagement'
import KanbanConfigurationPage from './components/systemSetting/KanbanConfiguration'
import HomePageConfigurationPage from './components/systemSetting/HomePageConfiguration'
import CustomerInformationPage from './components/BasicInformation/CustomerInformation'
import DataImportPage from './components/BasicInformation/DataImport'
import StaffInformationPage from './components/BasicInformation/ManpowerInformation/StaffInformation'
import ClassSettingPage from './components/BasicInformation/ManpowerInformation/ClassSetting'
import SchedulingInformationPage from './components/BasicInformation/ManpowerInformation/SchedulingInformation'
import UnitOfMeasurementPage from './components/BasicInformation/MaterialResources/UnitOfMeasurement'
import MaterialInformationPage from './components/BasicInformation/MaterialResources/MaterialInformation'
import MaterialBOMPage from './components/BasicInformation/MaterialResources/MaterialBOM'
import PackingSpecificationPage from './components/BasicInformation/MaterialResources/PackingSpecification'
import SamplingStandardPage from './components/BasicInformation/QualityItems/SamplingStandard'
import TestItemsPage from './components/BasicInformation/QualityItems/TestItems'
import InspectionPlanPage from './components/BasicInformation/QualityItems/InspectionPlan'
import UnpleasantSightPage from './components/BasicInformation/QualityItems/UnpleasantSight'
import BadReasonsPage from './components/BasicInformation/QualityItems/BadReasons'
import ParametersPage from './components/BasicInformation/TuningParameters/Parameters'
import TechnicalParameterPage from './components/BasicInformation/TuningParameters/TechnicalParameter'
import VersionManagementPage from './components/BasicInformation/TuningParameters/VersionManagement'
import TuningRecordPage from './components/BasicInformation/TuningParameters/TuningRecord'
import JobManagementPage from './components/BasicInformation/JobManagement'
import MoldInformationPage from './components/MoldManagement/MoldInformation'
import EquipmentInformationPage from './components/EquipmentManagement/EquipmentInformation'
import WorkstationManagementPage from './components/ManufacturingProcess/WorkstationManagement'
import ProcessManagementPage from './components/ManufacturingProcess/ProcessManagement'
import CraftsManagementPage from './components/ManufacturingProcess/CraftsManagement'
import MaterialJourneyPage from './components/ManufacturingProcess/MaterialJourney'
import OperatingInstructionsPage from './components/WorkInstructions/OperatingInstructions'
import GuideBookConnectionPage from './components/WorkInstructions/GuideBookConnection'
import ExceptionDefinitionPage from './components/ExceptionManagement/ExceptionDefinition'
import WarningSettingsPage from './components/ExceptionManagement/WarningSettings'
import WorkOrderManagementPage from './components/ProductionManagement/WorkOrderManagement'
import OrderManagementPage from './components/ProductionManagement/OrderManagement'
import MachineAdjustmentPage from './components/ProductionManagement/MachineAdjustment'
import OrderAdjustmentPage from './components/ProductionManagement/OrderAdjustment'
import TemplateFileManagementPage from './components/BarcodeManagement/TemplateFileManagement'
import SequenceNumberGenerationRulesPage from './components/BarcodeManagement/SequenceNumberGenerationRules'
import LabelTemplateManagementPage from './components/BarcodeManagement/LabelTemplateManagement'
import ItemNumberTemplateAssociationPage from './components/BarcodeManagement/ItemNumberTemplateAssociation'
import LabelPrintingApplicationPage from './components/BarcodeManagement/LabelPrintingApplication'
import LabelPrintJobPage from './components/BarcodeManagement/LabelPrintJob'
import QualityInspectionRecordPage from './components/FieldWork/QualityInspectionRecord'
import YieldReportPage from './components/ProductionReport/YieldReport'
import InquiryPage from './components/ProductionReport/Inquiry'
import BootDailyPage from './components/ProductionReport/BootDaily'
import PostProcessDailyReportPage from './components/ProductionReport/PostProcessDailyReport'
import MachineProductionStatusPage from './components/ProductionReport/MachineProductionStatus'
import WorkOrderQualificationRatePage from './components/ProductionReport/WorkOrderQualificationRate'
import TestBrowsPanelPage from './components/BrowsePanelPreview/TestBrowsPanel'



//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/LoginPage'},
        {path:'/LoginPage',component:LoginPage},
        {path:'/home',component:HomeContainer,
            children:[
                {path:'/home',component:HomePage,name:'0'},//首页
                {path:'/role',component:RoleManagementPage,name:'1-1',},//角色管理
                {path:'/organization',component:organization,name:'1-2',},
                {path:'/userlog',component:userlog,name:'1-3'},
                {path:'/ExceptionLogPage',component:ExceptionLogPage,name:'1-4'},
                {path:'/TopologyManagementPage',component:TopologyManagementPage,name:'1-5'},
                {path:'/KanbanConfigurationPage',component:KanbanConfigurationPage,name:'1-6'},
                {path:'/HomePageConfigurationPage',component:HomePageConfigurationPage,name:'1-7'},
                {path:'/CustomerInformationPage',component:CustomerInformationPage,name:'2-1'},
                {path:'/DataImportPage',component:DataImportPage,name:'2-2'},
                {path:'/StaffInformationPage',component:StaffInformationPage,name:'2-3-1'},
                {path:'/ClassSettingPage',component:ClassSettingPage,name:'2-3-2'},
                {path:'/SchedulingInformationPage',component:SchedulingInformationPage,name:'2-3-3'},
                {path:'/UnitOfMeasurementPage',component:UnitOfMeasurementPage,name:'2-4-1'},//计量单位
                {path:'/MaterialInformationPage',component:MaterialInformationPage,name:'2-4-2'},//料件资料
                {path:'/MaterialBOMPage',component:MaterialBOMPage,name:'2-4-3'},//物料BOM
                {path:'/PackingSpecificationPage',component:PackingSpecificationPage,name:'2-4-4'},//包装规格
                {path:'/SamplingStandardPage',component:SamplingStandardPage,name:'2-5-1'},//抽样标准
                {path:'/TestItemsPage',component:TestItemsPage,name:'2-5-2'},//检验项目
                {path:'/InspectionPlanPage',component:InspectionPlanPage,name:'2-5-3'},//检验方案
                {path:'/UnpleasantSightPage',component:UnpleasantSightPage,name:'2-5-4'},//不良现象
                {path:'/BadReasonsPage',component:BadReasonsPage,name:'2-5-5'},//不良原因
                {path:'/ParametersPage',component:ParametersPage,name:'2-6-1'},//参数资料
                {path:'/TechnicalParameterPage',component:TechnicalParameterPage,name:'2-6-2'},//技术参数
                {path:'/VersionManagementPage',component:VersionManagementPage,name:'2-6-3'},//版本管理
                {path:'/TuningRecordPage',component:TuningRecordPage,name:'2-6-4'},//调机记录
                {path:'/JobManagementPage',component:JobManagementPage,name:'2-7'},//岗位管理
                {path:'/MoldInformationPage',component:MoldInformationPage,name:'3-1'},//模具资料
                {path:'/EquipmentInformationPage',component:EquipmentInformationPage,name:'4-1'},//设备资料
                {path:'/WorkstationManagementPage',component:WorkstationManagementPage,name:'5-1'},//工位管理
                {path:'/ProcessManagementPage',component:ProcessManagementPage,name:'5-2'},//工序管理
                {path:'/CraftsManagementPage',component:CraftsManagementPage,name:'5-3'},//工艺管理
                {path:'/MaterialJourneyPage',component:MaterialJourneyPage,name:'5-4'},//料件途程
                {path:'/OperatingInstructionsPage',component:OperatingInstructionsPage,name:'6-1'},//作业指导书
                {path:'/GuideBookConnectionPage',component:GuideBookConnectionPage,name:'6-2'},//指导书关联
                {path:'/ExceptionDefinitionPage',component:ExceptionDefinitionPage,name:'7-1'},//异常定义
                {path:'/WarningSettingsPage',component:WarningSettingsPage,name:'7-2'},//预警设置
                {path:'/WorkOrderManagementPage',component:WorkOrderManagementPage,name:'8-1'},//工单管理
                {path:'/OrderManagementPage',component:OrderManagementPage,name:'8-2'},//排单管理
                {path:'/MachineAdjustmentPage',component:MachineAdjustmentPage,name:'8-3'},//机器调整
                {path:'/OrderAdjustmentPage',component:OrderAdjustmentPage,name:'8-4'},//顺序调整
                {path:'/TemplateFileManagementPage',component:TemplateFileManagementPage,name:'9-1'},//模板文件管理
                {path:'/SequenceNumberGenerationRulesPage',component:SequenceNumberGenerationRulesPage,name:'9-2'},//序号生成规则
                {path:'/LabelTemplateManagementPage',component:LabelTemplateManagementPage,name:'9-3'},//标签模板管理
                {path:'/ItemNumberTemplateAssociationPage',component:ItemNumberTemplateAssociationPage,name:'9-4'},//标签打印申请
                {path:'/LabelPrintingApplicationPagePage',component:LabelPrintingApplicationPage,name:'9-5'},//料号模板关联
                {path:'/LabelPrintJobPagePage',component:LabelPrintJobPage,name:'9-6'},//标签打印作业
                {path:'/QualityInspectionRecordPage',component:QualityInspectionRecordPage,name:'10-1'},//质检记录
                {path:'/YieldReportPage',component:YieldReportPage,name:'11-1'},//产量报表
                {path:'/InquiryPage',component:InquiryPage,name:'11-2'},//在制查询
                {path:'/BootDailyPage',component:BootDailyPage,name:'11-3'},//开机日报
                {path:'/PostProcessDailyReportPage',component:PostProcessDailyReportPage,name:'11-4'},//后工序日报
                {path:'/MachineProductionStatusPage',component:MachineProductionStatusPage,name:'11-5'},//机台生产状况
                {path:'/WorkOrderQualificationRatePage',component:WorkOrderQualificationRatePage,name:'11-6'},//工单合格率
                {path:'/TestBrowsPanelPagePage',component:TestBrowsPanelPage,name:'12-1'},//测试看板

            ]
        }
    ]
});
export default router