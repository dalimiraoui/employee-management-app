import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeOutputDTO } from '../dto/output/EmployeeOutputDTO';
@Injectable()
export class EmployeeService {
  private readonly serviceApiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getEmployees(page: number, pageSize: number) {
    const params = {
      noofRecords: pageSize.toString(),
      idStarts: ((page - 1) * pageSize + 1).toString()
    };

    return this.http.get<EmployeeOutputDTO[]>(this.serviceApiUrl, { params });
  }
}
