using System;
using System.Drawing;
using RabbitMQ.Client;
using Aspose.Words;
using Aspose.Words.Drawing;
using Aspose.Cells;
using RabbitMQ.Client.Content;
using RuanYun.Word;
using RuanYun.Word.Builder.GridData;
using BorderType = Aspose.Words.BorderType;
using Style = Aspose.Cells.Style;

namespace _1
{
    class Program
    {
        static void Main(string[] args)
        {
            var basePath = AppDomain.CurrentDomain.BaseDirectory;
            string exeDir = AppDomain.CurrentDomain.BaseDirectory;//当前项目的目录
            string dataDir = new Uri(new Uri(exeDir), @"Data/").LocalPath;//当前项目目录下的某个文件夹

            #region 设置文本水印效果

            //var doc = new Document();
            //var builder = new DocumentBuilder(doc);
            //builder.CellFormat.Borders.LineStyle = LineStyle.Single;
            //builder.Font.Color = Color.Red;
            //builder.Write("这是一个表格");
            //builder.Font.Color = Color.Blue;
            //builder.InsertParagraph();
            //builder.InsertHtml("<div style='font-size:12px'>表格~表格~</div>");
            //builder.InsertImage(basePath + "right_bg.png");//图片的插入

            //builder.Writeln("保存PDF时进行授权访问设置 - 推酷保存PDF时进行授权访问设置 - 推酷保存PDF时进行授权访问设置 - 推酷保存PDF时进行授权访问设置 - 推酷");
            //builder.InsertBreak(BreakType.SectionBreakNewPage);//分页
            //builder.Font.Size = 10;
            //var watermark = new Shape(doc, ShapeType.TextPlainText);//创建水印
            //watermark.TextPath.Text = "大水印";
            //watermark.TextPath.FontFamily = "黑体";
            //watermark.Width = 300;
            //watermark.Height = 150;
            //watermark.Rotation = -50;//水印倾斜
            //watermark.FillColor = Color.Gray;//水印字体颜色设置
            //watermark.StrokeColor = Color.Gray;
            ////水印在页的位置
            //watermark.RelativeHorizontalPosition = RelativeHorizontalPosition.Page;//水平垂直居中
            //watermark.RelativeVerticalPosition = RelativeVerticalPosition.Page;
            //watermark.WrapType = WrapType.None;
            //watermark.VerticalAlignment = VerticalAlignment.Center;//文字居中方式
            //watermark.HorizontalAlignment = HorizontalAlignment.Center;
            ////创建一个新的段落来附加这个水印
            //var watermarkpara = new Paragraph(doc);
            //watermarkpara.AppendChild(watermark);
            ////插入水印
            //foreach (Section sect in doc.Sections)
            //{
            //    InsertWatermarkIntoHeader(watermarkpara, sect, HeaderFooterType.HeaderPrimary);
            //    InsertWatermarkIntoHeader(watermarkpara, sect, HeaderFooterType.HeaderFirst);
            //    InsertWatermarkIntoHeader(watermarkpara, sect, HeaderFooterType.HeaderEven);
            //}
            ////循环添加表格
            //for (int i = 0; i < 5; i++)
            //{
            //    for (int j = 0; j < 5; j++)
            //    {
            //        builder.InsertCell();
            //        if (i % 2 == 0)
            //        {
            //            builder.CellFormat.Shading.BackgroundPatternColor = Color.BlanchedAlmond;
            //        }
            //        else
            //        {
            //            builder.CellFormat.Shading.BackgroundPatternColor = Color.BurlyWood;
            //        }
            //        builder.Write("这是一个单元格" + j);
            //    }
            //    builder.EndRow();
            //}
            //builder.EndTable();
            //builder.InsertBreak(BreakType.SectionBreakNewPage);//分页
            //builder.Font.ClearFormatting();
            //builder.Writeln("DocumentBuilder is a powerful class that is associated with a Document and allows dynamic document building from scratch or the addition of new elements to an existing document. It provides methods to insert text, paragraphs, lists, tables, images and other contents, specification of font, paragraph, and section formatting, and other things. Using DocumentBuilder is somewhat similar in concept to using the StringBuilder class of the .NET Framework.");
            //builder.StartBookmark("一个书签");
            //builder.Font.Color = Color.Green;
            //builder.Writeln("利用书签单独的格式设置");
            //builder.EndBookmark("一个书签");
            //doc.Save("demo2.docx");

            #endregion

            #region

            var workbook = new Workbook();
            var worksheet = workbook.Worksheets.Add("去年买了个表");
            workbook.Worksheets.ActiveSheetIndex = 1;
            var style = new Style();
            style.Borders[Aspose.Cells.BorderType.TopBorder].LineStyle = CellBorderType.Thin;
            style.Borders[Aspose.Cells.BorderType.BottomBorder].LineStyle = CellBorderType.Thin;
            style.Borders[Aspose.Cells.BorderType.LeftBorder].LineStyle = CellBorderType.Thin;
            style.Borders[Aspose.Cells.BorderType.RightBorder].LineStyle = CellBorderType.Thin;
            for (int i = 0; i < 5; i++)
            {
                worksheet.Cells[0, i].SetStyle(style);
                worksheet.Cells[0, i].Value = "表头" + i;
            }
            for (int i = 1; i < 5000; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    worksheet.Cells[i, j].SetStyle(style);
                    worksheet.Cells[i, j].Value = "数据" + j;
                }
            }
            workbook.Save(dataDir + DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss") + "excel01.xlsx");

            #endregion

        }


        //插入水印的方法
        private static void InsertWatermarkIntoHeader(Paragraph watermarkPara, Section sect, HeaderFooterType headerType)
        {
            HeaderFooter header = sect.HeadersFooters[headerType];

            if (header == null)
            {
                header = new HeaderFooter(sect.Document, headerType);
                sect.HeadersFooters.Add(header);
            }

            header.AppendChild(watermarkPara.Clone(true));
        }
    }
}
