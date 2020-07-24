import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer'
import LoginPage from './components/tabbar/LoginContainer'
import HomePage from './components/home/home-contain'
import RoleManagementPage from './components/systemSetting/RoleManagement'
import UserManagementPage from './components/systemSetting/UserManagement'
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
                {path:'/HomeContainer',component:HomePage},
                {path:'/RoleManagementPage',component:RoleManagementPage},
                {path:'/UserManagementPage',component:UserManagementPage},
                {path:'/LogQueryPage',component:LogQueryPage},
                {path:'/ExceptionLogPage',component:ExceptionLogPage},
                {path:'/TopologyManagementPage',component:TopologyManagementPage},
                {path:'/KanbanConfigurationPage',component:KanbanConfigurationPage},
                {path:'/HomePageConfigurationPage',component:HomePageConfigurationPage},
                {path:'/CustomerInformationPage',component:CustomerInformationPage},
                {path:'/DataImportPage',component:DataImportPage},
                {path:'/StaffInformationPage',component:StaffInformationPage},
                {path:'/ClassSettingPage',component:ClassSettingPage},
                {path:'/SchedulingInformationPage',component:SchedulingInformationPage},
                {path:'/UnitOfMeasurementPage',component:UnitOfMeasurementPage},
                {path:'/MaterialInformationPage',component:MaterialInformationPage},
                {path:'/MaterialBOMPage',component:MaterialBOMPage},
                {path:'/PackingSpecificationPage',component:PackingSpecificationPage},
                {path:'/SamplingStandardPage',component:SamplingStandardPage},
                {path:'/TestItemsPage',component:TestItemsPage},
                {path:'/InspectionPlanPage',component:InspectionPlanPage},
                {path:'/UnpleasantSightPage',component:UnpleasantSightPage},
                {path:'/BadReasonsPage',component:BadReasonsPage},
                {path:'/ParametersPage',component:ParametersPage},
                {path:'/TechnicalParameterPage',component:TechnicalParameterPage},
                {path:'/VersionManagementPage',component:VersionManagementPage},
                {path:'/TuningRecordPage',component:TuningRecordPage},
                {path:'/JobManagementPage',component:JobManagementPage},
                {path:'/MoldInformationPage',component:MoldInformationPage},
                {path:'/EquipmentInformationPage',component:EquipmentInformationPage},
                {path:'/WorkstationManagementPage',component:WorkstationManagementPage},
                {path:'/ProcessManagementPage',component:ProcessManagementPage},
                {path:'/CraftsManagementPage',component:CraftsManagementPage},
                {path:'/MaterialJourneyPage',component:MaterialJourneyPage},
                {path:'/OperatingInstructionsPage',component:OperatingInstructionsPage},
                {path:'/GuideBookConnectionPage',component:GuideBookConnectionPage},
                {path:'/ExceptionDefinitionPage',component:ExceptionDefinitionPage},
                {path:'/WarningSettingsPage',component:WarningSettingsPage},
                {path:'/WorkOrderManagementPage',component:WorkOrderManagementPage},
                {path:'/OrderManagementPage',component:OrderManagementPage},
                {path:'/MachineAdjustmentPage',component:MachineAdjustmentPage},
                {path:'/OrderAdjustmentPage',component:OrderAdjustmentPage},
                {path:'/TemplateFileManagementPage',component:TemplateFileManagementPage},
                {path:'/SequenceNumberGenerationRulesPage',component:SequenceNumberGenerationRulesPage},
                {path:'/LabelTemplateManagementPage',component:LabelTemplateManagementPage},
                {path:'/ItemNumberTemplateAssociationPage',component:ItemNumberTemplateAssociationPage},
                {path:'/LabelPrintingApplicationPagePage',component:LabelPrintingApplicationPage},
                {path:'/LabelPrintJobPagePage',component:LabelPrintJobPage},
                {path:'/QualityInspectionRecordPage',component:QualityInspectionRecordPage},
                {path:'/YieldReportPage',component:YieldReportPage},
                {path:'/InquiryPage',component:InquiryPage},
                {path:'/BootDailyPage',component:BootDailyPage},
                {path:'/PostProcessDailyReportPage',component:PostProcessDailyReportPage},
                {path:'/MachineProductionStatusPage',component:MachineProductionStatusPage},
                {path:'/WorkOrderQualificationRatePage',component:WorkOrderQualificationRatePage},
                {path:'/TestBrowsPanelPagePage',component:TestBrowsPanelPage},

            ]
        }
    ]
});
export default router