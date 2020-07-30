import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer'
import LoginPage from './components/tabbar/LoginContainer'
import HomePage from './components/home/home-contain'
import RoleManagementPage from './components/systemSetting/RoleManagement'
import organization from './components/systemSetting/UserManagement'//系统设置-用户管理
import LogQueryPage from './components/systemSetting/LogQuery'
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
        {path:'/HomeContainer',component:HomeContainer,
            children:[
                {path:'/HomeContainer',component:HomePage,name:'0'},//首页
                {path:'/RoleManagementPage',component:RoleManagementPage,name:'1-1',},//角色管理
                {path:'/organization',component:organization,name:'1-2',},
                {path:'/LogQueryPage',component:LogQueryPage,name:'1-3'},
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
                {path:'/SamplingStandardPage',component:SamplingStandardPage,name:'1-16'},//抽样标准
                {path:'/TestItemsPage',component:TestItemsPage,name:'1-17'},//检验项目
                {path:'/InspectionPlanPage',component:InspectionPlanPage,name:'1-18'},//检验方案
                {path:'/UnpleasantSightPage',component:UnpleasantSightPage,name:'1-19'},//不良现象
                {path:'/BadReasonsPage',component:BadReasonsPage,name:'1-21'},//不良原因
                {path:'/ParametersPage',component:ParametersPage,name:'1-22'},//参数资料
                {path:'/TechnicalParameterPage',component:TechnicalParameterPage,name:'1-23'},//技术参数
                {path:'/VersionManagementPage',component:VersionManagementPage,name:'1-24'},//版本管理
                {path:'/TuningRecordPage',component:TuningRecordPage,name:'1-25'},//调机记录
                {path:'/JobManagementPage',component:JobManagementPage,name:'1-11'},//岗位管理
                {path:'/MoldInformationPage',component:MoldInformationPage,name:'1-11'},//模具资料
                {path:'/EquipmentInformationPage',component:EquipmentInformationPage,name:'1-11'},//设备管理
                {path:'/WorkstationManagementPage',component:WorkstationManagementPage,name:'1-11'},
                {path:'/ProcessManagementPage',component:ProcessManagementPage,name:'1-11'},
                {path:'/CraftsManagementPage',component:CraftsManagementPage,name:'1-11'},
                {path:'/MaterialJourneyPage',component:MaterialJourneyPage,name:'1-11'},
                {path:'/OperatingInstructionsPage',component:OperatingInstructionsPage,name:'1-11'},
                {path:'/GuideBookConnectionPage',component:GuideBookConnectionPage,name:'1-11'},
                {path:'/ExceptionDefinitionPage',component:ExceptionDefinitionPage,name:'1-11'},
                {path:'/WarningSettingsPage',component:WarningSettingsPage,name:'1-11'},
                {path:'/WorkOrderManagementPage',component:WorkOrderManagementPage,name:'1-11'},
                {path:'/OrderManagementPage',component:OrderManagementPage,name:'1-11'},
                {path:'/MachineAdjustmentPage',component:MachineAdjustmentPage,name:'1-11'},
                {path:'/OrderAdjustmentPage',component:OrderAdjustmentPage,name:'1-11'},
                {path:'/TemplateFileManagementPage',component:TemplateFileManagementPage,name:'1-11'},
                {path:'/SequenceNumberGenerationRulesPage',component:SequenceNumberGenerationRulesPage,name:'1-11'},
                {path:'/LabelTemplateManagementPage',component:LabelTemplateManagementPage,name:'1-11'},
                {path:'/ItemNumberTemplateAssociationPage',component:ItemNumberTemplateAssociationPage,name:'1-11'},
                {path:'/LabelPrintingApplicationPagePage',component:LabelPrintingApplicationPage,name:'1-11'},
                {path:'/LabelPrintJobPagePage',component:LabelPrintJobPage,name:'1-11'},
                {path:'/QualityInspectionRecordPage',component:QualityInspectionRecordPage,name:'1-11'},
                {path:'/YieldReportPage',component:YieldReportPage,name:'1-11'},
                {path:'/InquiryPage',component:InquiryPage,name:'1-11'},
                {path:'/BootDailyPage',component:BootDailyPage,name:'1-11'},
                {path:'/PostProcessDailyReportPage',component:PostProcessDailyReportPage,name:'1-11'},
                {path:'/MachineProductionStatusPage',component:MachineProductionStatusPage,name:'1-11'},
                {path:'/WorkOrderQualificationRatePage',component:WorkOrderQualificationRatePage,name:'1-11'},
                {path:'/TestBrowsPanelPagePage',component:TestBrowsPanelPage,name:'1-11'},

            ]
        }
    ]
});
export default router